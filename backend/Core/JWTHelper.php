<?php

declare(strict_types=1);

namespace App\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Dotenv\Dotenv;
use stdClass;

final class JWTHelper {
    private static ?string $secret = null;

    // Load JWT secret from environment
    private static function secret(): string {
        if (self::$secret !== null) {
            return self::$secret;
        }

        $dotenv = Dotenv::createImmutable(dirname(__DIR__));
        $dotenv->safeLoad();

        self::$secret = $_ENV['JWT_SECRET'];

        return self::$secret;
    }

    // Create a JWT for the authenticated user
    public static function create(int $userId): string {
        $payload = [
            'sub' => $userId,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 7)
        ];

        return JWT::encode(
            $payload,
            self::secret(),
            'HS256'
        );
    }

    // Verify a JWT
    public static function verify(string $token): stdClass {
        return JWT::decode(
            $token,
            new Key(
                self::secret(),
                'HS256'
            )
        );
    }
}