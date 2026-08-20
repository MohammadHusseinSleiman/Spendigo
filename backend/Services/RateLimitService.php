<?php

declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Core\ApiResponse;
use PDO;

final class RateLimitService {
    // Check whether the login bucket is currently blocked
    public static function check(
        string $key,
        int $maxAttempts,
        int $windowSeconds,
        int $blockSeconds = 0,
        string $message = 'Too many requests. Please try again later.'
    ): void {

        $pdo = Database::getConnection();

        $keyHash = hash('sha256', $key);

        $statement = $pdo->prepare(
            '
            SELECT
                id,
                attempts,
                window_started_at,
                blocked_until
            FROM rate_limits
            WHERE key_hash = :key_hash
            LIMIT 1
            '
        );

        $statement->execute([
            'key_hash' => $keyHash,
        ]);

        $record = $statement->fetch();

        if (!$record) {
            return;
        }

        $now = time();

        // Active block
        if (
            $record['blocked_until'] !== null
            && strtotime(
                $record['blocked_until']
            ) > $now
        ) {
            self::tooManyRequests($message);
        }

        // Reset expired window
        $windowStartedAt = strtotime(
            $record['window_started_at']
        );

        if (
            $windowStartedAt === false
            || ($now - $windowStartedAt)
                >= $windowSeconds
        ) {

            self::reset($keyHash);

            return;
        }

        // Maximum failed attempts reache
        if (
            (int) $record['attempts']
            >= $maxAttempts
        ) {

            if ($blockSeconds > 0) {

                $blockedUntil = date(
                    'Y-m-d H:i:s',
                    $now + $blockSeconds
                );

                $update = $pdo->prepare(
                    '
                    UPDATE rate_limits
                    SET blocked_until = :blocked_until
                    WHERE id = :id
                    '
                );

                $update->execute([
                    'blocked_until' => $blockedUntil,
                    'id' => $record['id'],
                ]);
            }

            self::tooManyRequests($message);
        }
    }

    // Record a failed authentication attempt
    public static function recordFailure(
        string $key,
        int $windowSeconds = 900
    ): void {

        $pdo = Database::getConnection();

        $keyHash = hash('sha256', $key);

        $statement = $pdo->prepare(
            '
            SELECT
                id,
                attempts,
                window_started_at
            FROM rate_limits
            WHERE key_hash = :key_hash
            LIMIT 1
            '
        );

        $statement->execute([
            'key_hash' => $keyHash,
        ]);

        $record = $statement->fetch();

        if (!$record) {

            $insert = $pdo->prepare(
                '
                INSERT INTO rate_limits (
                    key_hash,
                    attempts,
                    window_started_at,
                    blocked_until
                )
                VALUES (
                    :key_hash,
                    1,
                    NOW(),
                    NULL
                )
                '
            );

            $insert->execute([
                'key_hash' => $keyHash,
            ]);

            return;
        }

        $windowStartedAt = strtotime(
            $record['window_started_at']
        );

        // Start a new window if the old one expired
        if (
            $windowStartedAt === false
            || (time() - $windowStartedAt)
                >= $windowSeconds
        ) {

            self::reset($keyHash);

            return;
        }

        $update = $pdo->prepare(
            '
            UPDATE rate_limits
            SET attempts = attempts + 1
            WHERE id = :id
            '
        );

        $update->execute([
            'id' => $record['id'],
        ]);
    }

    // Clear failed login attempts after successful login
    public static function clear(
        string $key
    ): void {

        $pdo = Database::getConnection();

        $keyHash = hash('sha256', $key);

        $statement = $pdo->prepare(
            '
            DELETE FROM rate_limits
            WHERE key_hash = :key_hash
            '
        );

        $statement->execute([
            'key_hash' => $keyHash,
        ]);
    }

    // Reset a rate-limit bucket
    private static function reset(
        string $keyHash
    ): void {

        $pdo = Database::getConnection();

        $statement = $pdo->prepare(
            '
            UPDATE rate_limits
            SET
                attempts = 0,
                window_started_at = NOW(),
                blocked_until = NULL
            WHERE key_hash = :key_hash
            '
        );

        $statement->execute([
            'key_hash' => $keyHash,
        ]);
    }

    // Return HTTP 429
    private static function tooManyRequests(
        string $message
    ): never
    {
        ApiResponse::error(
            $message,
            429
        );
    }
}