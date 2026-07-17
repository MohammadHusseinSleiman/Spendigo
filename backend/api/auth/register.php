<?php

declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\Request;
use App\Core\Validator;

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

// Validate required fields.
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

// Check if email already exists.
$stmt = $db->prepare(
    "SELECT id FROM users WHERE email = ?"
);

$stmt->execute([$email]);

if ($stmt->fetch()) {
    ApiResponse::error(
        'Email already exists.',
        409
    );
}

// Hash password before storing.
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

// Create default notification settings.
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

// Default categories for new users.
$categories = [

    [
        'name' => 'Salary',
        'type' => 'income',
        'color' => '#22C55E'
    ],

    [
        'name' => 'Freelance',
        'type' => 'income',
        'color' => '#16A34A'
    ],

    [
        'name' => 'Food',
        'type' => 'expense',
        'color' => '#EF4444'
    ],

    [
        'name' => 'Transport',
        'type' => 'expense',
        'color' => '#F97316'
    ],

    [
        'name' => 'Shopping',
        'type' => 'expense',
        'color' => '#8B5CF6'
    ],

    [
        'name' => 'Bills',
        'type' => 'expense',
        'color' => '#3B82F6'
    ],

    [
        'name' => 'Other',
        'type' => 'expense',
        'color' => '#64748B'
    ],

];

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

ApiResponse::created(
    [
        'user_id' => $userId
    ],
    'Account created successfully.'
);