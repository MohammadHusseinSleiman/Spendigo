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

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

// Monthly income vs expenses chart
export default function IncomeExpenseChart({
    data = [],
}) {

    if (data.length === 0) {

        return (
            <Card>

                <h2 className="text-lg font-semibold">
                    Monthly Income vs Expenses
                </h2>

                <div className="mt-6">
                    <EmptyState
                        title="No report data"
                        description="There is no income or expense data available for the selected period."
                    />
                </div>

            </Card>
        );
    }

    return (

        <Card>

            <h2 className="mb-4 text-base font-semibold sm:mb-6 sm:text-lg">
                Monthly Income vs Expenses
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 5,
                        left:-15,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value) =>
                            `$${Number(value).toFixed(2)}`
                        }
                    />
                    <Legend />
                    <Bar
                        dataKey="income"
                        name="Income"
                        fill="#22C55E"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar
                        dataKey="expenses"
                        name="Expenses"
                        fill="#EF4444"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>

            </ResponsiveContainer>

        </Card>
    );
}