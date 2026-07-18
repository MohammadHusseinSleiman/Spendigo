<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\DefaultCategories;
use App\Core\JWTHelper;
use App\Core\Request;
use App\Core\Validator;
//use Throwable;

// Only allow POST requests.
if (Request::method() !== 'POST') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

// Get request data.
$data = Request::json();

$fullName = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirmPassword = $data['confirm_password'] ?? '';

// Validate input.
$errors = [];

if (!Validator::required($fullName)) {
    $errors['full_name'] = 'Full name is required.';
}

if (!Validator::email($email)) {
    $errors['email'] = 'Invalid email address.';
}

if (!Validator::minLength($password, 8)) {
    $errors['password'] =
        'Password must be at least 8 characters.';
}

if ($password !== $confirmPassword) {
    $errors['confirm_password'] =
        'Passwords do not match.';
}

if (!empty($errors)) {
    ApiResponse::validation($errors);
}

$db = Database::getConnection();

try {

    // Start database transaction.
    $db->beginTransaction();

    // Check existing email.
    $stmt = $db->prepare(
        "SELECT 1 FROM users WHERE email = ? LIMIT 1"
    );

    $stmt->execute([$email]);

    if ($stmt->fetch()) {

        $db->rollBack();

        ApiResponse::error(
            'Email already exists.',
            409
        );
    }

    // Hash password.
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // Create user.
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

    // Create notification settings.
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

    // Create default categories.
    $categories = DefaultCategories::all();

    $stmt = $db->prepare(
        "
        INSERT INTO categories
        (
            user_id,
            name,
            type,
            color
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?
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

    // Commit database changes.
    $db->commit();

    // Create authentication token.
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

    // Rollback if any database operation fails.
    if ($db->inTransaction()) {
        $db->rollBack();
    }

    ApiResponse::error(
        'Failed to create account.',
        500
    );
}