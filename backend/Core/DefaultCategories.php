<?php

declare(strict_types=1);

namespace App\Core;

final class DefaultCategories {
    public static function all(): array {
        return [
            [
                'name' => 'Salary',
                'type' => 'income',
                'color' => '#22C55E',
            ],
            [
                'name' => 'Freelance',
                'type' => 'income',
                'color' => '#16A34A',
            ],
            [
                'name' => 'Food',
                'type' => 'expense',
                'color' => '#EF4444',
            ],
            [
                'name' => 'Transport',
                'type' => 'expense',
                'color' => '#F97316',
            ],
            [
                'name' => 'Shopping',
                'type' => 'expense',
                'color' => '#8B5CF6',
            ],
            [
                'name' => 'Bills',
                'type' => 'expense',
                'color' => '#3B82F6',
            ],
            [
                'name' => 'Other',
                'type' => 'expense',
                'color' => '#64748B',
            ],
        ];
    }
}