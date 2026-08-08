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

            <Card className="min-w-0">

                <h2
                    className="
                        text-base
                        font-semibold
                        sm:text-lg
                    "
                >
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

        <Card
            className="
                min-w-0
                overflow-hidden
                p-4
                sm:p-6
            "
        >

            <h2
                className="
                    mb-4
                    text-base
                    font-semibold
                    sm:mb-6
                    sm:text-lg
                "
            >
                Expenses by Category
            </h2>

            <div
                className="
                    h-64
                    w-full
                    min-w-0
                    sm:h-80
                    lg:h-[350px]
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="name"
                            outerRadius="70%"
                            label={({ percent }) =>
                                `${(
                                    percent * 100
                                ).toFixed(0)}%`
                            }
                        >

                            {data.map(
                                (category) => (

                                    <Cell
                                        key={
                                            category.name
                                        }
                                        fill={
                                            category.color
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip
                            formatter={(value) =>
                                `$${Number(
                                    value
                                ).toFixed(2)}`
                            }
                        />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </Card>

    );
}