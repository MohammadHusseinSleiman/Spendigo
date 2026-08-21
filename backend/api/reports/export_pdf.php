<?php

declare(strict_types=1);

require_once __DIR__ . "/../../bootstrap.php";

use App\Config\Database;
use App\Core\Request;
use App\Middleware\AuthMiddleware;
use App\Services\ReportService;
use Dompdf\Dompdf;

// Only allow GET requests
if (Request::method() !== "GET") {
    http_response_code(405);
    exit;
}

// Authenticate user
$userId = AuthMiddleware::handle();

$service = new ReportService(
    Database::getConnection()
);

$currency = $service->currency($userId);

$transactions = $service->transactions(
    $userId
);

$html = '
<h2 style="text-align:center;">
Spendigo Report
</h2>

<table
    width="100%"
    border="1"
    cellspacing="0"
    cellpadding="8"
>

<tr
    style="background:#f3f4f6;"
>

<th>Date</th>
<th>Description</th>
<th>Category</th>
<th>Type</th>
<th>Amount</th>

</tr>';

foreach ($transactions as $transaction) {

    $html .= '

    <tr>

        <td>'
        . htmlspecialchars($transaction["transaction_date"]) .
        '</td>

        <td>'
        . htmlspecialchars($transaction["description"]) .
        '</td>

        <td>'
        . htmlspecialchars($transaction["category"]) .
        '</td>

        <td>'
        . ucfirst($transaction["type"]) .
        '</td>

        <td>'
        . htmlspecialchars($currency)
        . ' '
        . number_format(
            (float) $transaction["amount"],
            2
        ) .
        '</td>

    </tr>';

}

$html .= '</table>';

$pdf = new Dompdf();

$pdf->loadHtml($html);

$pdf->setPaper(
    "A4",
    "portrait"
);

$pdf->render();

$pdf->stream(
    "report.pdf",
    [
        "Attachment" => true,
    ]
);