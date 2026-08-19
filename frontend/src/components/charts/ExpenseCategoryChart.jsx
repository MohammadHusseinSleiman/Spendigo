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

import formatCurrency from "../../utils/formatCurrency";

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
                        text-slate-900
                        dark:text-slate-100
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
                    text-slate-900
                    dark:text-slate-100
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
                            outerRadius="75%"
                            innerRadius="45%"
                            paddingAngle={2}
                        >

                            {data.map(
                                (category) => (

                                    <Cell
                                        key={category.name}
                                        fill={
                                            category.color ||
                                            "#94a3b8"
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip
                            formatter={(value, name) => [
                                formatCurrency(Number(value)),
                                name,
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={40}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </Card>
    );
}