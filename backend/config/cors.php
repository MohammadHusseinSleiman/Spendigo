<?php

declare(strict_types=1);

namespace App\Config;

final class Cors {
    
    // Configure API access headers
    public static function handle(): void
    {
        header('Content-Type: application/json; charset=UTF-8');

        header('Access-Control-Allow-Origin: http://localhost:5174');

        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

        // Handle browser preflight requests.
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }
}