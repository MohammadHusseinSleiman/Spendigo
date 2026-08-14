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

    // Get the last 12 months net cash flow for the user
    public function monthlyNetCashFlow(int $userId): array {
        $currentMonth = new \DateTimeImmutable(
            'first day of this month'
        );

        $startMonth = $currentMonth->modify(
            '-11 months'
        );

        $nextMonth = $currentMonth->modify(
            '+1 month'
        );

        $stmt = $this->db->prepare("
            SELECT
                DATE_FORMAT(transaction_date, '%Y-%m') AS month,
                SUM(
                    CASE
                        WHEN type = 'income'
                        THEN amount
                        ELSE 0
                    END
                ) -
                SUM(
                    CASE
                        WHEN type = 'expense'
                        THEN amount
                        ELSE 0
                    END
                ) AS net_cash_flow
            FROM transactions
            WHERE
                user_id = ?
                AND transaction_date >= ?
                AND transaction_date < ?
            GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
            ORDER BY month ASC
        ");

        $stmt->execute([
            $userId,
            $startMonth->format('Y-m-d'),
            $nextMonth->format('Y-m-d'),
        ]);

        $rows = $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );

        // Create a lookup table from the database result
        // This allows to include months with no transactions as zero instead of removing them
        $monthlyData = [];

        foreach ($rows as $row) {
            $monthlyData[$row['month']] =
                (float) $row['net_cash_flow'];
        }

        // Build exactly 12 months
        $result = [];

        for ($i = 0; $i < 12; $i++) {

            $month = $startMonth->modify(
                "+{$i} months"
            );

            $monthKey = $month->format('Y-m');

            $result[] = [
                'month' => $monthKey,
                'net_cash_flow' =>
                    $monthlyData[$monthKey] ?? 0,
            ];
        }

        return $result;
    }
}