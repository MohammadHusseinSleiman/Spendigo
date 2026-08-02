<?php

declare(strict_types=1);

require_once __DIR__ . "/../../bootstrap.php";

use App\Config\Database;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\ReportService;

// Allow only GET requests
if (Request::method() !== "GET") {
    http_response_code(405);
    exit;
}

// Authenticate user
$userId = AuthMiddleware::handle();

$service = new ReportService(
    Database::getConnection()
);

// Get all transactions
$transactions = $service->transactions($userId);

// CSV download headers
header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=report.csv");

$output = fopen("php://output", "w");

// Header row
fputcsv($output, [
    "Date",
    "Description",
    "Category",
    "Type",
    "Amount",
]);

// Data rows
foreach ($transactions as $transaction) {

    fputcsv($output, [

        $transaction["transaction_date"],
        $transaction["description"],
        $transaction["category"],
        ucfirst($transaction["type"]),
        $transaction["amount"],

    ]);

}

fclose($output);
exit;