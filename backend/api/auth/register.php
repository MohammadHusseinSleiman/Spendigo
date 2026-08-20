<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Services\RateLimitService;
use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\DefaultCategories;
use App\Core\JWTHelper;
use App\Core\Request;
use App\Core\Validator;
use Throwable;

// Only allow POST requests
if (Request::method() !== 'POST') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Get request data
$data = Request::json();

$fullName = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirm_password'] ?? '';

// Validate input
$errors = [];

if (!Validator::required($fullName)) {
    $errors['full_name'] = 'Full name is required.';
}

if (!Validator::email($email)) {
    $errors['email'] = 'Invalid email address.';
}

if (!Validator::minLength($password, 8)) {
    $errors['password'] = 'Password must be at least 8 characters.';
}

if ($password !== $confirmPassword) {
    $errors['confirm_password'] = 'Passwords do not match.';
}

// Do not consume rate-limit attempts for invalid request data
if (!empty($errors)) {
    ApiResponse::validation($errors);
}

// Identify the client by IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Rate-limit bucket for registration
$rateLimitKey = sprintf(
    'register:%s',
    $ip
);

// Allow 5 failed registration attempts within a 15-minute window
RateLimitService::check(
    $rateLimitKey,
    5,
    900,
    900
);

$db = Database::getConnection();

try {

    // Start database transaction
    $db->beginTransaction();

    // Check existing email
    $stmt = $db->prepare(
        "SELECT 1 FROM users WHERE email = ? LIMIT 1"
    );

    $stmt->execute([$email]);

    if ($stmt->fetch()) {

        $db->rollBack();

        // Count an existing-account attempt toward the registration rate limit
        RateLimitService::recordFailure(
            $rateLimitKey
        );

        ApiResponse::error(
            'Email already exists.',
            409
        );
    }

    // Hash password
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // Create user
    $stmt = $db->prepare(
        "
        INSERT INTO users
        (
            full_name,
            email,
            password
        )
        VALUES
        (
            ?,
            ?,
            ?
        )
        "
    );

    $stmt->execute([
        $fullName,
        $email,
        $hashedPassword
    ]);

    $userId = (int)$db->lastInsertId();

    // Create notification settings
    $stmt = $db->prepare(
        "
        INSERT INTO notification_settings
        (
            user_id
        )
        VALUES
        (?)
        "
    );

    $stmt->execute([
        $userId
    ]);

    // Create default categories
    $categories = DefaultCategories::all();

    $stmt = $db->prepare(
        "
        INSERT INTO categories
        (
            user_id,
            name,
            type,
            color,
            is_default
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            1
        )
        "
    );

    foreach ($categories as $category) {

        $stmt->execute([
            $userId,
            $category['name'],
            $category['type'],
            $category['color']
        ]);
    }

    // Commit database changes
    $db->commit();

    // Registration succeeded
    // Clear the registration rate-limit bucket
    RateLimitService::clear(
        $rateLimitKey
    );

    // Create authentication token
    $token = JWTHelper::create($userId);

    ApiResponse::created(
        [
            'token' => $token,

            'user' => [
                'id' => $userId,
                'full_name' => $fullName,
                'email' => $email
            ]
        ],
        'Account created successfully.'
    );

} catch (Throwable $exception) {

    // Rollback if any database operation fails
    if ($db->inTransaction()) {
        $db->rollBack();
    }

    ApiResponse::error(
        'Failed to create account.',
        500
    );
}