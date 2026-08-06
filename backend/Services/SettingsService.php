<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class SettingsService {
    public function __construct( private readonly PDO $db ) {}

    // Get authenticated user's profile
    public function getProfile( int $userId ): array {

        $stmt = $this->db->prepare("
            SELECT
                full_name,
                email,
                photo,
                bio,
                currency,
                dark_mode
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $stmt->execute([
            $userId
        ]);

        $profile = $stmt->fetch(PDO::FETCH_ASSOC);

        return $profile ?: [];
    }


    // Update authenticated user's profile
    public function updateProfile(
        int $userId,
        array $data
    ): void {

        $stmt = $this->db->prepare("
            UPDATE users
            SET
                full_name = ?,
                email = ?,
                bio = ?,
                currency = ?,
                updated_at = NOW()
            WHERE id = ?
        ");

        $stmt->execute([
            trim($data['full_name']),
            trim($data['email']),
            $data['bio'],
            $data['currency'],
            $userId,
        ]);
    }


    // Check if email already exists
    public function emailExists(
        string $email,
        int $userId
    ): bool {

        $stmt = $this->db->prepare("
            SELECT COUNT(*)
            FROM users
            WHERE email = ?
            AND id <> ?
        ");

        $stmt->execute([
            $email,
            $userId,
        ]);

        return (bool) $stmt->fetchColumn();
    }


    // Verify current password
    public function verifyPassword(
        int $userId,
        string $password
    ): bool {

        $stmt = $this->db->prepare("
            SELECT password
            FROM users
            WHERE id = ?
        ");

        $stmt->execute([
            $userId
        ]);

        $hash = $stmt->fetchColumn();

        return password_verify(
            $password,
            $hash
        );
    }


    // Update user password
    public function changePassword(
        int $userId,
        string $password
    ): void {

        $stmt = $this->db->prepare("
            UPDATE users
            SET password = ?
            WHERE id = ?
        ");

        $stmt->execute([
            password_hash(
                $password,
                PASSWORD_DEFAULT
            ),
            $userId
        ]);
    }


    // Update user photo
    public function updatePhoto(
        int $userId,
        string $photo
    ): void {

        $stmt = $this->db->prepare("
            UPDATE users
            SET photo = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $photo,
            $userId,
        ]);
    }


    // Update user preferences
    public function updatePreferences(
        int $userId,
        array $data
    ): void {

        $stmt = $this->db->prepare("
            UPDATE users
            SET
                currency = ?,
                dark_mode = ?
            WHERE id = ?
        ");

        $stmt->execute([
            $data['currency'],
            (int) $data['dark_mode'],
            $userId,
        ]);
    }


    // Get user preferences
    public function getPreferences( int $userId ): array {

        $stmt = $this->db->prepare("
            SELECT
                currency,
                dark_mode
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: [];
    }


    // Delete Account
public function deleteAccount( int $userId ): void {

    $stmt = $this->db->prepare("
        SELECT photo
        FROM users
        WHERE id = ?
    ");

    $stmt->execute([
        $userId
    ]);

    $photo = $stmt->fetchColumn();

    if ($photo) {

        $path =
            __DIR__
            . "/../../"
            . $photo;

        if (file_exists($path)) {
            unlink($path);
        }
    }

    $stmt = $this->db->prepare("
        DELETE FROM users
        WHERE id = ?
    ");

    $stmt->execute([
        $userId
    ]);
}
}