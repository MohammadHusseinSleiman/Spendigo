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

};