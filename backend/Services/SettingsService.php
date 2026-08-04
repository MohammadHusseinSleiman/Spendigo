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
                currency
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
}