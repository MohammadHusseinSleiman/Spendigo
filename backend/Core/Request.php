<?php

declare(strict_types=1);

namespace App\Core;

final class Request
{
    public static function json(): array
    {
        $data = json_decode(file_get_contents('php://input'), true);

        return is_array($data)
            ? $data
            : [];
    }

    public static function bearerToken(): ?string
    {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            return null;
        }

        if (!preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return null;
        }

        return $matches[1];
    }
}