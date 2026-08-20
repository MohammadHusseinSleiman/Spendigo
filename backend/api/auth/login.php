<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\JWTHelper;
use App\Core\Request;
use App\Core\Validator;
use App\Services\RateLimitService;

if (Request::method() !== 'POST') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

$data = Request::json();

$email = trim( $data['email'] ?? '' );

$password = $data['password'] ?? '';

$errors = [];

if (!Validator::email($email)) {
    $errors['email'] =b'Invalid email.';
}

if (!Validator::required($password)) {
    $errors['password'] = 'Password is required.';
}

if (!empty($errors)) {
    ApiResponse::validation(
        $errors
    );
}

// Build the login rate-limit key
// The email is normalized to lowercase and combined with the client's IP address
$ip = $_SERVER['REMOTE_ADDR']
    ?? 'unknown';

$rateLimitKey = sprintf(
    'login:%s:%s',
    strtolower($email),
    $ip
);

// Allow five failed attempts within a fifteen-minute window
// After reaching the limit, block further login attempts for another fifteen minutes
RateLimitService::check(
    $rateLimitKey,
    5,
    900,
    900
);

$db = Database::getConnection();

$stmt = $db->prepare(
    "
    SELECT
        id,
        full_name,
        email,
        password
    FROM users
    WHERE email = ?
    "
);

$stmt->execute([
    $email
]);

$user = $stmt->fetch();

// Do not reveal whether the email exists
if (!$user) {
    RateLimitService::recordFailure(
        $rateLimitKey
    );
    ApiResponse::error(
        'Invalid email or password.',
        401
    );
}

// Verify password
if (
    !password_verify(
        $password,
        $user['password']
    )
) {
    RateLimitService::recordFailure(
        $rateLimitKey
    );
    ApiResponse::error(
        'Invalid email or password.',
        401
    );
}

// Successful authentication
// Clear previous failed attempts for this login bucket
RateLimitService::clear(
    $rateLimitKey
);

$token = JWTHelper::create(
    (int) $user['id']
);

unset(
    $user['password']
);

ApiResponse::success(
    [
        'token' => $token,
        'user' => $user,
    ],
    'Login successful.'
);