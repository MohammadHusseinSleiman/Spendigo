<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

// Handles dashboard calculations and statistics
final class DashboardService {
    public function __construct( private readonly PDO $db ) {}

    // Returns all dashboard data required by the frontend
    public function summary( int $userId ): array {

        return [
            'balance' => $this->getBalance($userId),
            'monthly_income' => $this->getMonthlyIncome($userId),
            'monthly_expenses' => $this->getMonthlyExpenses($userId),
            'savings_rate' => $this->getSavingsRate($userId),
            'income_vs_expenses' => [],
            'expense_breakdown' => [],
            'recent_transactions' => [],
        ];
    }

    // Calculate current account balance
    private function getBalance( int $userId ): float {

        $stmt = $this->db->prepare(
            "
            SELECT
                COALESCE(
                    SUM(
                        CASE
                            WHEN type = 'income'
                                THEN amount
                            ELSE -amount
                        END
                    ),
                    0
                ) AS balance
            FROM transactions
            WHERE user_id = ?
            "
        );

        $stmt->execute([
            $userId
        ]);

        return (float)$stmt->fetchColumn();
    }

    // Calculate total income for the current month
    private function getMonthlyIncome( int $userId ): float {

        $stmt = $this->db->prepare(
            "
            SELECT
                COALESCE(
                    SUM(amount),
                    0
                )
            FROM transactions
            WHERE
                user_id = ?
                AND type = 'income'
                AND YEAR(transaction_date) = YEAR(CURDATE())
                AND MONTH(transaction_date) = MONTH(CURDATE())
            "
        );

        $stmt->execute([
            $userId
        ]);

        return (float)$stmt->fetchColumn();
    }

    // Calculate total expenses for the current month
    private function getMonthlyExpenses( int $userId ): float {

        $stmt = $this->db->prepare(
            "
            SELECT
                COALESCE(
                    SUM(amount),
                    0
                )
            FROM transactions
            WHERE
                user_id = ?
                AND type = 'expense'
                AND YEAR(transaction_date) = YEAR(CURDATE())
                AND MONTH(transaction_date) = MONTH(CURDATE())
            "
        );

        $stmt->execute([
            $userId
        ]);

        return (float)$stmt->fetchColumn();
    }

    // Savings rate percentage
    private function getSavingsRate( int $userId ): float {

        $income = $this->getMonthlyIncome( $userId );

        if ($income <= 0) { return 0; }

        $expenses = $this->getMonthlyExpenses( $userId );

        return round(
            (($income - $expenses) / $income) * 100,
            2
        );
    }
}