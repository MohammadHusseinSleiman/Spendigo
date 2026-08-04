import {
    ArrowDownCircle,
    ArrowUpCircle,
    Wallet,
    PiggyBank,
} from "lucide-react";

// Dashboard statistics cards
export default function DashboardStats({ stats }) {

    const cards = [

        {
            title: "Current Balance",
            value: `$${Number(
                stats.balance
            ).toLocaleString()}`,
            icon: Wallet,
            color: "bg-slate-800",
        },

        {
            title: "Monthly Income",
            value: `$${Number(
                stats.monthly_income
            ).toLocaleString()}`,
            icon: ArrowUpCircle,
            color: "bg-emerald-600",
        },

        {
            title: "Monthly Expenses",
            value: `$${Number(
                stats.monthly_expenses
            ).toLocaleString()}`,
            icon: ArrowDownCircle,
            color: "bg-red-600",
        },

        {
            title: "Savings Rate",
            value: `${stats.savings_rate}%`,
            icon: PiggyBank,
            color: "bg-blue-600",
        },

    ];

    return (

        <div
            className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {card.title}
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-3xl
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`
                                    ${card.color}
                                    rounded-xl
                                    p-3
                                    text-white
                                `}
                            >
                                <Icon size={28} />
                            </div>

                        </div>

                    </div>

                );

            })}

        </div>
    );
}