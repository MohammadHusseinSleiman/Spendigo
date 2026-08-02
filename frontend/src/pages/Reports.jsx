import { useEffect, useState } from "react";

import reportService from "../services/reportService";
import IncomeExpenseChart from "../components/reports/IncomeExpenseChart";
import AppLayout from "../components/layout/AppLayout";

export default function Reports() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        loadChart();
    }, []);

    async function loadChart() {
        const data = await reportService.getMonthlyIncomeExpense();
        setChartData(data);
    }

    return (

        <AppLayout
            title="Reports & Analytics"
            description="Analyze your financial performance"
        >

            <IncomeExpenseChart
                data={chartData}
            />

        </AppLayout>

    );
}