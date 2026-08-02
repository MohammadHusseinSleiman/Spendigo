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

};