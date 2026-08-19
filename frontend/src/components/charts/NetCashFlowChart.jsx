import { useEffect, useState } from "react";

import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

import formatCurrency from "../../utils/formatCurrency";

function formatMonth(month) {
    const date = new Date(`${month}-01T00:00:00`);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
}

export default function NetCashFlowChart({
    data = [],
}) {

    const [screenCategory, setScreenCategory] = useState(
        window.innerWidth < 600
            ? "mobile"
            : window.innerWidth < 1150
                ? "medium"
                : "laptop"
    );

    useEffect(() => {

        function handleResize() {

            if (window.innerWidth < 600) {
                setScreenCategory("mobile");
            } else if (window.innerWidth < 1150) {
                setScreenCategory("medium");
            } else {
                setScreenCategory("laptop");
            }
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );

    }, []);

    const monthsToShow =
        screenCategory === "mobile"
            ? 3
            : screenCategory === "medium"
                ? 6
                : 12;

    const visibleData =
        data.slice(-monthsToShow);

    const chartData = visibleData.map(
        (item) => ({
            month: item.month,
            label: formatMonth(item.month),
            net_cash_flow: Number(
                item.net_cash_flow ?? 0
            ),
        })
    );

    const periodLabel =
        monthsToShow === 3
            ? "Last 3 months overview"
            : monthsToShow === 6
                ? "Last 6 months overview"
                : "Last 12 months overview";

    if (data.length === 0) {

        return (
            <Card className="min-w-0">

                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                ">
                    Net Cash Flow
                </h2>

                <div className="mt-6">
                    <EmptyState
                        title="No cash flow data"
                        description="There is no cash flow data available for the selected period."
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

            <div className="mb-5">

                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                ">
                    Net Cash Flow
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                ">
                    {periodLabel}
                </p>

            </div>

            <div
                className="
                    h-[240px]
                    w-full
                    sm:h-[280px]
                    lg:h-[320px]
                "
                aria-label="Net cash flow chart"
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 15,
                            left: 0,
                            bottom: 0,
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
                            padding={{
                                left: 20,
                                right: 10,
                            }}
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

                        <ReferenceLine
                            y={0}
                            stroke="#94a3b8"
                            strokeDasharray="4 4"
                        />

                        <Tooltip
                            formatter={(value) => [
                                formatCurrency(
                                    Number(value)
                                ),
                                "Net Cash Flow",
                            ]}
                            labelFormatter={(label) =>
                                label
                            }
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="net_cash_flow"
                            name="Net Cash Flow"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </Card>
    );
}