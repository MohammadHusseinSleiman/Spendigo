import api from "../api/axios";

export default {

    // Get dashboard summary
    async getSummary() {

        const response = await api.get(
            "/dashboard/summary.php"
        );

        const data = response.data.data;

        data.expense_breakdown =
            data.expense_breakdown.map(item => ({
                ...item,
                total: Number(item.total),
            }));

        data.income_vs_expenses =
            data.income_vs_expenses.map(item => ({
                ...item,
                income: Number(item.income),
                expenses: Number(item.expenses),
            }));

        return data;
    }
}