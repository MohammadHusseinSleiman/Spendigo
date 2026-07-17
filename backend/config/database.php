<?php

declare(strict_types=1);

namespace App\Config;

use PDO;
use PDOException;
use Dotenv\Dotenv;

final class Database {
    private static ?PDO $connection = null;

    // Return a reusable database connection
    public static function getConnection(): PDO {

        if (self::$connection !== null) {
            return self::$connection;
        }

        // Load environment variables.
        $dotenv = Dotenv::createImmutable(
            dirname(__DIR__)
        );

        $dotenv->safeLoad();

        try {

            self::$connection = new PDO(
                sprintf(
                    'mysql:host=%s;dbname=%s;charset=utf8mb4',
                    $_ENV['DB_HOST'],
                    $_ENV['DB_NAME']
                ),
                $_ENV['DB_USER'],
                $_ENV['DB_PASSWORD'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );

            return self::$connection;

        } catch (PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection failed.'
            ]);
            exit;
        }
    }
}