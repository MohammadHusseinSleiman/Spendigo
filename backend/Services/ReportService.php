<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class ReportService {

    public function __construct( private PDO $db ) {}

    public function summary(  $userId ): array {

        // Total income
        $stmt = $this->db->prepare("
            SELECT
                COALESCE(SUM(amount), 0)
            FROM transactions
            WHERE
                user_id = ?
                AND type = 'income'
        ");

        $stmt->execute([
            $userId
        ]);

        $totalIncome = (float) $stmt->fetchColumn();


        // Total expenses
        $stmt = $this->db->prepare("
            SELECT
                COALESCE(SUM(amount), 0)
            FROM transactions
            WHERE
                user_id = ?
                AND type = 'expense'
        ");

        $stmt->execute([
            $userId
        ]);

        $totalExpense = (float) $stmt->fetchColumn();


        // Transaction Number
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)
            FROM transactions
            WHERE user_id = ?
        ");

        $stmt->execute([
            $userId
        ]);

        $totalTransactions = (int) $stmt->fetchColumn();


        // Calculate balance
        $balance = $totalIncome - $totalExpense;

        return [
            'balance' => $balance,
            'income' => $totalIncome,
            'expenses' => $totalExpense,
            'transactions' => $totalTransactions,
        ];
    }


    // Get all transactions for export
    public function transactions( int $userId ): array {

        $stmt = $this->db->prepare("
            SELECT
                t.transaction_date,
                t.description,
                c.name AS category,
                t.type,
                t.amount
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            WHERE t.user_id = ?
            ORDER BY
                t.transaction_date DESC,
                t.id DESC
        ");

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}