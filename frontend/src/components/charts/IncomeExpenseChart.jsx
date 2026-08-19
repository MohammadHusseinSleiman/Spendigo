import { useEffect, useState } from "react";

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

import formatCurrency from "../../utils/formatCurrency";

function formatMonth(month) {

    const date =
        new Date(`${month}-01T00:00:00`);

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            year: "numeric",
        }
    ).format(date);
}

// Monthly income vs expenses chart
export default function IncomeExpenseChart({
    data = [],
}) {

    const [screenCategory, setScreenCategory] =
        useState(
            window.innerWidth < 600
                ? "mobile"
                : "medium"
        );

    useEffect(() => {

        function handleResize() {

            if (window.innerWidth < 600) {
                setScreenCategory("mobile");
            } else {
                setScreenCategory("medium");
            }
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };

    }, []);

    const monthsToShow =
        screenCategory === "mobile"
            ? 3
            : 6

    const visibleData =
        data.slice(-monthsToShow);

    const chartData =
        visibleData.map((item) => ({
            month: item.month,
            label: formatMonth(item.month),
            income: Number(
                item.income ?? 0
            ),
            expenses: Number(
                item.expenses ?? 0
            ),
        }));

    const periodLabel =
        monthsToShow === 3
            ? "Last 3 months overview"
            : "Last 6 months overview";

    if (data.length === 0) {

        return (
            <Card className="min-w-0">

                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                ">
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

        <Card className="
            min-w-0
            overflow-hidden
            p-4
            sm:p-6
        ">

            <div className="mb-4 sm:mb-6">

                <h2 className="
                    text-base
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                    sm:text-lg
                ">
                    Monthly Income vs Expenses
                </h2>

            </div>

            <div
                className="
                    h-64
                    w-full
                    min-w-0
                    sm:h-80
                    lg:h-[350px]
                "
                aria-label="Monthly income versus expenses chart"
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 5,
                            left: -15,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#334155"
                            opacity={0.25}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{
                                fontSize: 12,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                formatCurrency(
                                    Number(value)
                                )
                            }
                        />

                        <Tooltip
                            formatter={(value, name) => [
                                formatCurrency(
                                    Number(value)
                                ),
                                name,
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                            }}
                        />

                        <Legend />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#22C55E"
                            radius={[8, 8, 0, 0,]}
                        />

                        <Bar
                            dataKey="expenses"
                            name="Expenses"
                            fill="#EF4444"
                            radius={[8, 8, 0, 0,]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </Card>
    );
}