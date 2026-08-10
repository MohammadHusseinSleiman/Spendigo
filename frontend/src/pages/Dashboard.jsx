import { useEffect, useState } from "react";

import { toast } from "sonner";

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
                data.recent_transactions ?? []
            );

        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    }

    if (loading || !dashboard) {
        return <LoadingSpinner />;
    }

    return (

        <AppLayout
            title="Dashboard"
            description="Overview of your financial activity"
        >

            <div className="space-y-6">

                {/* Statistics */}
                <DashboardStats
                    stats={dashboard ?? {}}
                />

                {/* Charts */}
                <div
                    className="
                        grid
                        min-w-0
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    <IncomeExpenseChart
                        data={
                            dashboard.income_vs_expenses ?? []
                        }
                    />

                    <ExpenseCategoryChart
                        data={
                            dashboard.expense_breakdown ?? []
                        }
                    />

                </div>

                {/* Recent Transactions + Quick Actions */}
                <div
                    className="
                        grid
                        min-w-0
                        gap-6
                        lg:grid-cols-3
                    "
                >

                    <div
                        className="
                            min-w-0
                            lg:col-span-2
                        "
                    >
                        <RecentTransactions
                            transactions={
                                recentTransactions
                            }
                        />
                    </div>

                    <div className="min-w-0">
                        <QuickActions />
                    </div>

                </div>

            </div>

        </AppLayout>

    );
}