<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class ReportService {

    public function __construct(
        private PDO $db
    ) {
    }

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

    public function monthlyIncomeExpense( int $userId ): array {

        $stmt = $this->db->prepare("
            SELECT
                DATE_FORMAT(transaction_date, '%Y-%m') AS month,
                SUM(
                    CASE
                        WHEN type = 'income'
                        THEN amount
                        ELSE 0
                    END
                ) AS income,
                SUM(
                    CASE
                        WHEN type = 'expense'
                        THEN amount
                        ELSE 0
                    END
                ) AS expenses
            FROM transactions
            WHERE user_id = ?
            GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
            ORDER BY month ASC
        ");

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}