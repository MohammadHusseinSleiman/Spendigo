<?php

declare(strict_types=1);

namespace App\Core;

final class ApiResponse
{
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
}