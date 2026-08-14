import api from "../api/axios";
import downloadFile from "../utils/downloadFile";

export default {

    async getSummary() {

        const response = await api.get(
            "/reports/summary.php"
        );

        return response.data.data;
    },


    // Get monthly income and expenses
    async getMonthlyIncomeExpense() {

        const response = await api.get(
            "/reports/monthly.php"
        );

        return response.data.data;
    },


    // Expense distribution by category
    async getExpensesByCategory() {

        const response = await api.get(
            "/reports/categories.php"
        );

        return response.data.data.map(item => ({
            ...item,
            total: Number(item.total),
        }));
    },


    // Get monthly net cash flow
    async getMonthlyNetCashFlow() {

        const response = await api.get(
            "/reports/net_cash_flow.php"
        );

        return response.data.data.map(item => ({
            ...item,
            net_cash_flow: Number(
                item.net_cash_flow
            ),
        }));
    },


    // Export CSV report
    async exportCSV() {

        const response = await api.get(
            "/reports/export_csv.php",
            {
                responseType: "blob",
            }
        );

        downloadFile(
            response.data,
            "report.csv"
        );
    },


    // Export PDF report
    async exportPDF() {

        const response = await api.get(
            "/reports/export_pdf.php",
            {
                responseType: "blob",
            }
        );

        downloadFile(
            response.data,
            "report.pdf"
        );
    },

};