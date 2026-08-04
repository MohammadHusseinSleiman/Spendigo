import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

export default function IncomeExpenseChart({ data = [] }) {
    if (data.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                    Monthly Income vs Expenses
                </h2>
                <p className="text-slate-500">No report data available.</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold">
                Monthly Income vs Expenses
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => `$${value}`}
                    />
                    <Legend />
                    <Bar
                        dataKey="income"
                        fill="#22C55E"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar
                        dataKey="expenses"
                        fill="#EF4444"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}