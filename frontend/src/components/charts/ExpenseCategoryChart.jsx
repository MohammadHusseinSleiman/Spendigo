import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

// Expense distribution by category
export default function ExpenseCategoryChart({
    data = [],
}) {

    if (data.length === 0) {

        return (
            <Card>

                <h2 className="text-lg font-semibold">
                    Expenses by Category
                </h2>

                <div className="mt-6">
                    <EmptyState
                        title="No expense data"
                        description="There is no expense data available to display."
                    />
                </div>

            </Card>
        );
    }

    return (

        <Card>

            <h2 className="mb-6 text-lg font-semibold">
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
                            `${(
                                percent * 100
                            ).toFixed(0)}%`
                        }
                    >
                        {data.map((category) => (
                            <Cell
                                key={category.name}
                                fill={
                                    category.color
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) =>
                            `$${Number(value).toFixed(2)}`
                        }
                    />
                    <Legend />
                </PieChart>

            </ResponsiveContainer>

        </Card>
    );
}