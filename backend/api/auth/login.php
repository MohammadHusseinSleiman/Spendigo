<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\JWTHelper;
use App\Core\Request;
use App\Core\Validator;

if (Request::method() !== 'POST') {
    ApiResponse::error(
        'Method not allowed.',
        405
    );
}

$data = Request::json();

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

$errors = [];

if (!Validator::email($email)) {
    $errors['email'] = 'Invalid email.';
}

if (!Validator::required($password)) {
    $errors['password'] = 'Password is required.';
}

if (!empty($errors)) {
    ApiResponse::validation($errors);
}

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

$stmt->execute([$email]);

$user = $stmt->fetch();

if (!$user) {
    ApiResponse::error(
        'Invalid email or password.',
        401
    );
}

if (
    !password_verify(
        $password,
        $user['password']
    )
) {
    ApiResponse::error(
        'Invalid email or password.',
        401
    );
}

$token = JWTHelper::create(
    (int)$user['id']
);

unset($user['password']);

ApiResponse::success(
    [
        'token' => $token,
        'user' => $user
    ],
    'Login successful.'
);