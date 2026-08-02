import { useEffect, useState } from "react";

import reportService from "../services/reportService";

import AppLayout from "../components/layout/AppLayout";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/reports/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/reports/ExpenseCategoryChart";

export default function Reports() {

    const [summary, setSummary] = useState({});
    const [chartData, setChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        loadSummary();
        loadChart();
        loadCategoriesChart();
    }, []);

    // Load reports summary
    async function loadSummary() {
        const data = await reportService.getSummary();
        setSummary(data);
    }

    // Load monthly income and expense data
    async function loadChart() {
        const data = await reportService.getMonthlyIncomeExpense();
        setChartData(data);
    }

    // Load expenses grouped by category
    async function loadCategoriesChart() {
        const data = await reportService.getExpensesByCategory();
        setCategoryData(data);
    }

    return (

        <AppLayout
            title="Reports & Analytics"
            description="Analyze your financial performance"
        >

            <ReportsSummary
                summary={summary}
            />

            <div
                className="
                    mt-8
                    grid
                    gap-6
                    xl:grid-cols-2
                "
            >

                <IncomeExpenseChart
                    data={chartData}
                />

                <ExpenseCategoryChart
                    data={categoryData}
                />

            </div>

        </AppLayout>

    );
}