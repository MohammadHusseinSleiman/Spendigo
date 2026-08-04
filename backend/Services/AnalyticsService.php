<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

final class AnalyticsService {
    public function __construct( private readonly PDO $db ) {}

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

    // Get monthly income and expenses for the user
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