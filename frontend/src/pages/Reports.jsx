import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import reportService from "../services/reportService";

import AppLayout from "../components/layout/AppLayout";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import NetCashFlowChart from "../components/charts/NetCashFlowChart";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";

export default function Reports() {

    const [summary, setSummary] = useState({});
    const [chartData, setChartData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [netCashFlowData, setNetCashFlowData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    async function loadReports() {

        setLoading(true);

        try {

            const [
                summaryData,
                monthlyData,
                categoryChartData,
                netCashFlowData,
            ] = await Promise.all([
                reportService.getSummary(),
                reportService.getMonthlyIncomeExpense(),
                reportService.getExpensesByCategory(),
                reportService.getMonthlyNetCashFlow(),
            ]);

            setSummary(summaryData ?? {});
            setChartData(monthlyData ?? []);
            setCategoryData(categoryChartData ?? []);
            setNetCashFlowData(netCashFlowData ?? []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to load reports."
            );

        } finally {
            setLoading(false);
        }
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

            <div className="mt-6">
                <NetCashFlowChart
                    data={netCashFlowData}
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

                <div className="flex flex-col gap-3 sm:flex-row">

                    <Button
                        type="button"
                        onClick={handleExportCSV}
                        className="
                            cursor-pointer
                            w-full
                            gap-2
                            font-medium
                            active:scale-[0.98]
                            sm:w-auto
                        "
                    >
                        <Download size={18} />
                        Export CSV
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleExportPDF}
                        className="
                            cursor-pointer
                            w-full
                            gap-2
                            font-medium
                            hover:bg-slate-100
                            active:scale-[0.98]
                            sm:w-auto
                        "
                    >
                        <FileText size={18} />
                        Export PDF
                    </Button>

                </div>

            </Card>

        </AppLayout>
    );
}