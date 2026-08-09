import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import reportService from "../services/reportService";

import AppLayout from "../components/layout/AppLayout";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Reports() {

    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        loadSummary();
        loadChart();
        loadCategoriesChart();
    }, []);

    async function loadSummary() {
        try {
            const data = await reportService.getSummary();
            setSummary(data);
        } finally {
            setLoading(false);
        }
    }

    async function loadChart() {
        const data = await reportService.getMonthlyIncomeExpense();
        setChartData(data);
    }

    async function loadCategoriesChart() {
        const data = await reportService.getExpensesByCategory();
        setCategoryData(data);
    }

    async function handleExportCSV() {

        try {

            await reportService.exportCSV();
            toast.success("CSV report exported successfully.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to export CSV report."
            );
        }
    }

    async function handleExportPDF() {

        try {

            await reportService.exportPDF();
            toast.success("PDF report exported successfully.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to export PDF report."
            );
        }
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (

        <AppLayout
            title="Reports & Analytics"
            description="Analyze your financial performance"
        >

            {/* Summary */}
            <ReportsSummary
                summary={summary ?? {}}
            />

            {/* Charts */}
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

            {/* Export actions */}
            <Card className="mt-8">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Export Reports
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Download your financial data for record-keeping or accounting.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-4
                            py-2.5
                            font-medium
                            text-white
                            transition
                            hover:bg-emerald-700
                            active:scale-[0.98]
                        "
                    >
                        <Download size={18} />
                        Export CSV
                    </button>

                    <button
                        type="button"
                        onClick={handleExportPDF}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-50
                            active:scale-[0.98]
                        "
                    >
                        <FileText size={18} />
                        Export PDF
                    </button>

                </div>

            </Card>

        </AppLayout>
    );
}