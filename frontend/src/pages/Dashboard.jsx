import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import dashboardService from "../services/dashboardService";

import DashboardStats from "../components/dashboard/DashboardStats";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import QuickActions from "../components/dashboard/QuickActions";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const data = await dashboardService.getSummary();
            setDashboard(data);
            setRecentTransactions(
                data.recent_transactions
            );

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return (

        <AppLayout
            title="Dashboard"
            description="Overview of your financial activity"
        >

            <DashboardStats
                stats={dashboard}
            />

            <div
                className="
                    mt-8
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                <IncomeExpenseChart
                    data={
                        dashboard.income_vs_expenses
                    }
                />

                <ExpenseCategoryChart
                    data={
                        dashboard.expense_breakdown ?? []
                    }
                />

            </div>

            <RecentTransactions
                transactions={recentTransactions}
            />

            <QuickActions />

        </AppLayout>

    );
}