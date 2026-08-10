import {
    ArrowDownCircle,
    ArrowUpCircle,
    Wallet,
    PiggyBank,
} from "lucide-react";

import Card from "../common/Card";

import formatCurrency from "../../utils/formatCurrency";

// Dashboard statistics cards
export default function DashboardStats({
    stats = {},
}) {

    const cards = [

        {
            title: "Current Balance",
            value: formatCurrency(
                stats.balance ?? 0
            ),
            icon: Wallet,
            color: "bg-slate-800",
        },

        {
            title: "Monthly Income",
            value: formatCurrency(
                stats.monthly_income ?? 0
            ),
            icon: ArrowUpCircle,
            color: "bg-emerald-600",
        },

        {
            title: "Monthly Expenses",
            value: formatCurrency(
                stats.monthly_expenses ?? 0
            ),
            icon: ArrowDownCircle,
            color: "bg-red-600",
        },

        {
            title: "Savings Rate",
            value: `${Number(
                stats.savings_rate ?? 0
            ).toFixed(1)}%`,
            icon: PiggyBank,
            color: "bg-blue-600",
        },

    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <Card
                        key={card.title}
                        className="
                            min-w-0
                            p-4
                            sm:p-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >

                            <div className="min-w-0">

                                <p
                                    className="
                                        truncate
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {card.title}
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        truncate
                                        text-2xl
                                        font-bold
                                        text-slate-900
                                        sm:text-3xl
                                    "
                                >
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`
                                    ${card.color}
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-white
                                    sm:h-12
                                    sm:w-12
                                `}
                            >
                                <Icon size={24} />
                            </div>

                        </div>

                    </Card>

                );

            })}

        </div>

    );
}