import formatCurrency from "../../utils/formatCurrency";

// Reports summary cards
export default function ReportsSummary({ summary }) {



    const cards = [

        {
            title: "Balance",
            value: formatCurrency(summary.balance ?? 0),
        },

        {
            title: "Income",
            value: formatCurrency(summary.income ?? 0),
        },

        {
            title: "Expenses",
            value: formatCurrency(summary.expenses ?? 0),
        },

        {
            title: "Transactions",
            value: summary.transactions ?? 0,
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

            {cards.map(card => (

                <div
                    key={card.title}
                    className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                    "
                >

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
                        "
                    >
                        {card.value}
                    </h2>

                </div>

            ))}

        </div>
    );
}