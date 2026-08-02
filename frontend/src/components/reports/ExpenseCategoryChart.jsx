import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

// Expense distribution by category
export default function ExpenseCategoryChart({ data }) {
    if (data.length === 0) {
        return (
            <div
                className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                <h2 className="mb-4 text-lg font-semibold">
                    Expenses by Category
                </h2>

                <p className="text-slate-500">
                    No report data available.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
            "
        >
            {/* Card title */}
            <h2
                className="
                    mb-6
                    text-lg
                    font-semibold
                "
            >
                Expenses by Category
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="name"
                        outerRadius={120}
                        label={({ percent }) =>
                            `${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((category) => (
                            <Cell
                                key={category.name}
                                fill={category.color}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `$${value}`}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}