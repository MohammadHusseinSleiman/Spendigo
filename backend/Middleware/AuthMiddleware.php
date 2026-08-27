<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Config\Database;
use App\Core\ApiResponse;
use App\Core\JWTHelper;
use App\Core\Request;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Throwable;

final class AuthMiddleware {
    // Authenticate request using JWT token and verify that the user still exists
    public static function handle(): int {

        $token = Request::bearerToken();

        if ($token === null) {
            ApiResponse::unauthorized(
                'Authentication token is required.'
            );
        }

        try {

            $payload = JWTHelper::verify($token);

            if (!isset($payload->sub)) {
                ApiResponse::unauthorized(
                    'Invalid authentication token.'
                );
            }

            $userId = (int) $payload->sub;

            if ($userId <= 0) {
                ApiResponse::unauthorized(
                    'Invalid authentication token.'
                );
            }

            // Central user existence check
            $stmt = Database::getConnection()->prepare("
                SELECT id
                FROM users
                WHERE id = ?
                LIMIT 1
            ");

            $stmt->execute([
                $userId
            ]);

            if (!$stmt->fetchColumn()) {
                ApiResponse::unauthorized(
                    'User account no longer exists.'
                );
            }

            return $userId;

        } catch (ExpiredException $exception) {

            ApiResponse::unauthorized(
                'Token has expired.'
            );

        } catch (
            SignatureInvalidException $exception
        ) {

            ApiResponse::unauthorized(
                'Invalid token signature.'
            );

        } catch (Throwable $exception) {

            ApiResponse::unauthorized(
                'Invalid authentication token.'
            );
        }
    }
}