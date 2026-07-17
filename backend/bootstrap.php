<?php

declare(strict_types=1);

// Load Composer autoloader.
require_once __DIR__ . '/vendor/autoload.php';

use App\Config\Cors;

// Apply global API configuration.
Cors::handle();