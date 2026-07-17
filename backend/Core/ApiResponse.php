<?php

declare(strict_types=1);

namespace App\Core;

final class ApiResponse {

    // Return successful response
    public static function success(
        array $data = [],
        string $message = 'Success',
        int $status = 200
    ): never {
        http_response_code($status);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }

    // Return created resource response
    public static function created(
        array $data = [],
        string $message = 'Created successfully.'
    ): never {
        self::success(
            $data,
            $message,
            201
        );
    }

    // Return error response
    public static function error(
        string $message,
        int $status = 400
    ): never {
        http_response_code($status);
        echo json_encode([
            'success' => false,
            'message' => $message
        ]);
        exit;
    }

    // Return validation errors
    public static function validation(
        array $errors
    ): never {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }

    // Return unauthorized response
    public static function unauthorized(
        string $message = 'Unauthorized.'
    ): never {
        self::error(
            $message,
            401
        );
    }

    // Return not found response
    public static function notFound(
        string $message = 'Resource not found.'
    ): never {
        self::error(
            $message,
            404
        );
    }
}