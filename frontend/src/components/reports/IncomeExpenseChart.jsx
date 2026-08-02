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

export default function IncomeExpenseChart({ data }) {

    return (

        <div
            className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
            "
        >

            <h2
                className="
                    mb-6
                    text-lg
                    font-semibold
                "
            >
                Monthly Income vs Expenses
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="income"
                        fill="#22C55E"
                    />

                    <Bar
                        dataKey="expenses"
                        fill="#EF4444"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}