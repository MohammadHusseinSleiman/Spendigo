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


    // Expense distribution by category
    public function expensesByCategory( int $userId ): array {

        $stmt = $this->db->prepare("
            SELECT
                c.name,
                c.color,
                SUM(t.amount) AS total
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            WHERE
                t.user_id = ?
                AND t.type = 'expense'
            GROUP BY
                c.id,
                c.name,
                c.color
            ORDER BY total DESC
        ");

        $stmt->execute([
            $userId
        ]);

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
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