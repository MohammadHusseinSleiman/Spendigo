<?php

declare(strict_types=1);

namespace App\Services;

use PDO;

// Handles dashboard calculations and statistics
final class DashboardService {
    public function __construct( private readonly PDO $db ) {}

    // Returns all dashboard data required by the frontend
    public function summary( int $userId ): array {

        $analytics = new AnalyticsService(
            $this->db
        );

        return [
            'balance' => $this->getBalance($userId),
            'monthly_income' => $this->getMonthlyIncome($userId),
            'monthly_expenses' => $this->getMonthlyExpenses($userId),
            'savings_rate' => $this->getSavingsRate($userId),
            'income_vs_expenses' => $analytics->monthlyIncomeExpense($userId),
            'expense_breakdown' => $analytics->expensesByCategory($userId),
            'recent_transactions' => $this->latestTransactions($userId),
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

    // Get latest user transactions
    public function latestTransactions(
        int $userId,
        int $limit = 5
    ): array {

        $stmt = $this->db->prepare("
            SELECT
                t.id,
                t.description,
                t.amount,
                t.type,
                t.transaction_date,
                c.name AS category,
                c.color AS category_color
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            WHERE t.user_id = ?
            ORDER BY
                t.transaction_date DESC,
                t.id DESC
            LIMIT ?
        ");

        $stmt->bindValue(
            1,
            $userId,
            PDO::PARAM_INT
        );

        $stmt->bindValue(
            2,
            $limit,
            PDO::PARAM_INT
        );

        $stmt->execute();

        return $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );
    }

}