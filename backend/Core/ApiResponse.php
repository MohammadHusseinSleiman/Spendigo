<?php

declare(strict_types=1);

namespace App\Core;

final class ApiResponse {
    // Return a successful JSON response
    public static function success(
        ?array $data = null,
        string $message = 'Success',
        int $status = 200
    ): never {
        http_response_code($status);

        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        echo json_encode($response);

        exit;
    }

    // Return a created resource response
    public static function created(
        ?array $data = null,
        string $message = 'Created successfully.'
    ): never {
        self::success(
            $data,
            $message,
            201
        );
    }

    // Return an error response
    public static function error(
        string $message,
        int $status = 400
    ): never {
        http_response_code($status);

        echo json_encode([
            'success' => false,
            'message' => $message,
        ]);

        exit;
    }

    // Return validation errors
    public static function validation(
        array $errors,
        string $message = 'Validation failed.'
    ): never {
        http_response_code(422);

        echo json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ]);

        exit;
    }

    // Return an unauthorized response
    public static function unauthorized(
        string $message = 'Unauthorized.'
    ): never {
        self::error($message, 401);
    }

    // Return a not found response
    public static function notFound(
        string $message = 'Resource not found.'
    ): never {
        self::error($message, 404);
    }
}