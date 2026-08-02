import api from "../api/axios";

export default {

    async getSummary() {

        const response = await api.get(
            "/reports/summary.php"
        );

        return response.data.data;
    },


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


    // Export CSV report
    async exportCSV() {

        const response = await api.get(
            "/reports/export_csv.php",
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = "report.csv";

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },


    // Export PDF report
    async exportPDF() {

        const response = await api.get(
            "/reports/export_pdf.php",
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = "report.pdf";

        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },

};