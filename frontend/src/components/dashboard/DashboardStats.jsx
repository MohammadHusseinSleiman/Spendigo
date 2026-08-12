import {
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    PiggyBank,
} from "lucide-react";

import Card from "../common/Card";
import StatCard from "../common/StatCard";

import formatCurrency from "../../utils/formatCurrency";

// Dashboard statistics cards
export default function DashboardStats({ stats = {} }) {

    const cards = [
        {
            title: "Current Balance",
            value: formatCurrency(
                stats.balance ?? 0
            ),
            icon: Wallet,
            iconColor: "bg-slate-800",
        },

        {
            title: "Monthly Income",
            value: formatCurrency(
                stats.monthly_income ?? 0
            ),
            icon: ArrowUpCircle,
            iconColor: "bg-emerald-600",
        },

        {
            title: "Monthly Expenses",
            value: formatCurrency(
                stats.monthly_expenses ?? 0
            ),
            icon: ArrowDownCircle,
            iconColor: "bg-red-600",
        },

        {
            title: "Savings Rate",
            value: `${Number(
                stats.savings_rate ?? 0
            ).toFixed(1)}%`,
            icon: PiggyBank,
            iconColor: "bg-blue-600",
        },
    ];

    return (

        <div
            className="
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map((card) => (

                <StatCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    iconColor={card.iconColor}
                />

            ))}

        </div>

    );
}