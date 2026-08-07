import {
    Wallet,
    ArrowUpCircle,
    ArrowDownCircle,
    Receipt,
} from "lucide-react";

import formatCurrency from "../../utils/formatCurrency";
import StatCard from "../common/StatCard";

export default function ReportsSummary({ summary }) {

    const cards = [
        {
            title: "Balance",
            value: formatCurrency(
                summary.balance ?? 0
            ),
            icon: Wallet,
            iconColor: "text-emerald-600",
        },

        {
            title: "Income",
            value: formatCurrency(
                summary.income ?? 0
            ),
            icon: ArrowUpCircle,
            iconColor: "text-emerald-600",
        },

        {
            title: "Expenses",
            value: formatCurrency(
                summary.expenses ?? 0
            ),
            icon: ArrowDownCircle,
            iconColor: "text-red-500",
        },

        {
            title: "Transactions",
            value: summary.transactions ?? 0,
            icon: Receipt,
            iconColor: "text-blue-600",
        },
    ];

    return (
        <div
            className="
                grid
                gap-6
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