import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

import reportService from "../services/reportService";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";

import AppLayout from "../components/layout/AppLayout";
import ReportsSummary from "../components/reports/ReportsSummary";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import NetCashFlowChart from "../components/charts/NetCashFlowChart";
import ExportReportsCard from "../components/reports/ExportReportsCard";

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
                    mt-6
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
            <ExportReportsCard
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
            />

        </AppLayout>
    );
}