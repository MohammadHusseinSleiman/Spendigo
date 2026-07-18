<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Core\ApiResponse;
use App\Core\JWTHelper;
use App\Core\Request;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Throwable;

final class AuthMiddleware {
    // Authenticate request using JWT token
    public static function handle(): int {
        $token = Request::bearerToken();

        if ($token === null) {

            ApiResponse::unauthorized(
                'Authentication token is required.'
            );
        }

        try {

            $payload = JWTHelper::verify(
                $token
            );

            if (!isset($payload->sub)) {

                ApiResponse::unauthorized(
                    'Invalid authentication token.'
                );
            }

            return (int)$payload->sub;

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