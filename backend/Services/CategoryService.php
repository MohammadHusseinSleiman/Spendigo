<?php

declare(strict_types=1);

namespace App\Services;

use PDO;
use App\Core\ApiResponse;

final class CategoryService {
    public function __construct(
        private readonly PDO $db
    ) {
    }

    // Get all user categories
    public function list(
        int $userId
    ): array {

        $stmt = $this->db->prepare(
            "
            SELECT
                id,
                name,
                type,
                color,
                is_default
            FROM categories
            WHERE user_id = ?
            ORDER BY
                type ASC,
                name ASC
            "
        );

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }

    // Check if category already exists
    public function exists(
        int $userId,
        string $name,
        string $type
    ): bool {

        $stmt = $this->db->prepare(
            "
            SELECT COUNT(*)
            FROM categories
            WHERE
                user_id = ?
                AND name = ?
                AND type = ?
            "
        );

        $stmt->execute([
            $userId,
            $name,
            $type
        ]);

        return (bool) $stmt->fetchColumn();
    }

    // Create category
    public function create(
        int $userId,
        string $name,
        string $type,
        string $color
    ): bool {

        if (
            $this->exists(
                $userId,
                $name,
                $type
            )
        ) {
            return false;
        }

        $stmt = $this->db->prepare(
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
                ?, ?, ?, ?, 0
            )
            "
        );

        return $stmt->execute([
            $userId,
            $name,
            $type,
            $color
        ]);
    }

    // Update Category
    public function update(
        int $userId,
        int $id,
        array $data
    ): void {

        $stmt = $this->db->prepare(
            "
            UPDATE categories
            SET
                name = ?,
                type = ?,
                color = ?
            WHERE
                id = ?
                AND user_id = ?
                AND is_default = 0
            "
        );

        $stmt->execute([
            trim($data['name']),
            trim($data['type']),
            trim($data['color']),
            $id,
            $userId,
        ]);
    }

    // Delete Category
    public function delete(
        int $userId,
        int $id
    ): void {

        // Prevent deleting default categories
        $stmt = $this->db->prepare(
            "
            SELECT is_default
            FROM categories
            WHERE id = ?
            AND user_id = ?
            "
        );

        $stmt->execute([
            $id,
            $userId,
        ]);

        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {

            ApiResponse::error(
                'Category not found.',
                404
            );

        }

        if ((int)$category['is_default'] === 1) {

            ApiResponse::error(
                'Default categories cannot be deleted.',
                403
            );

        }

        // Check if category is used
        $stmt = $this->db->prepare(
            "
            SELECT COUNT(*)
            FROM transactions
            WHERE category_id = ?
            "
        );

        $stmt->execute([$id]);

        if ((int)$stmt->fetchColumn() > 0) {

            ApiResponse::error(
                'Category is used by transactions.',
                409
            );

        }

        // Delete category
        $stmt = $this->db->prepare(
            "
            DELETE FROM categories
            WHERE id = ?
            AND user_id = ?
            "
        );

        $stmt->execute([
            $id,
            $userId,
        ]);
    }
    }