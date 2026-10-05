<?php

declare(strict_types=1);

namespace App\Config;

final class Cors {
    // Allowed frontend origins.
    private const ALLOWED_ORIGINS = [
        'http://localhost:4173',
        'https://spendigo.great-site.net',
    ];

    // Configure API access headers.
    public static function handle(): void {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, self::ALLOWED_ORIGINS, true)) {
            header("Access-Control-Allow-Origin: {$origin}");
        }

        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

        // Handle browser preflight requests.
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}