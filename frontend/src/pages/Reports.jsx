import { useEffect, useState } from "react";

import reportService from "../services/reportService";

import AppLayout from "../components/layout/AppLayout";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";

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

            <button
                onClick={() => reportService.exportCSV()}
                className="
                    rounded-xl
                    bg-emerald-600
                    px-4
                    py-2
                    text-white
                    transition
                    hover:bg-emerald-700
                "
            >
                Export CSV
            </button>

            <button
                onClick={() => reportService.exportPDF()}
                className="
                    rounded-xl
                    border
                    px-4
                    py-2
                "
            >
                Export PDF
            </button>

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