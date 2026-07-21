<?php

declare(strict_types=1);

namespace App\Core;

final class Request {

    // Get JSON request body
    public static function json(): array {
        $data = json_decode(
            file_get_contents('php://input'),
            true
        );

        return is_array($data)
            ? $data
            : [];
    }

    // Get current HTTP method
    public static function method(): string {
        return $_SERVER['REQUEST_METHOD'];
    }

    // Get current HTTP method
    public static function bearerToken(): ?string {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            return null;
        }

        if (!preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return null;
        }

        return $matches[1];
    }

    // Get query string value
    public static function query(
        string $key,
        mixed $default = null
    ): mixed {

        return $_GET[$key] ?? $default;
    }
}