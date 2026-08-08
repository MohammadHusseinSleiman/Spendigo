import { useNavigate } from "react-router-dom";

import Card from "../common/Card";

// Latest transactions
export default function RecentTransactions({
    transactions = [],
}) {

    const navigate = useNavigate();

    return (

        <Card
            className="
                mt-0
                min-w-0
                overflow-hidden
                p-4
                sm:p-6
            "
        >

            {/* Header */}
            <div
                className="
                    mb-4
                    flex
                    flex-col
                    gap-2
                    sm:mb-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <h2
                    className="
                        text-lg
                        font-semibold
                        sm:text-xl
                    "
                >
                    Recent Transactions
                </h2>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/transactions")
                    }
                    className="
                        self-start
                        cursor-pointer
                        text-sm
                        font-medium
                        text-emerald-600
                        hover:underline
                        sm:self-auto
                    "
                >
                    View All →
                </button>

            </div>

            {transactions.length === 0 ? (

                <p
                    className="
                        py-6
                        text-center
                        text-sm
                        text-slate-500
                    "
                >
                    No recent transactions.
                </p>

            ) : (

                <div className="divide-y divide-slate-100">

                    {transactions.map(
                        (transaction) => (

                            <div
                                key={transaction.id}
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    justify-between
                                    gap-3
                                    py-4
                                "
                            >

                                {/* Left side */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        flex-1
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            h-3
                                            w-3
                                            shrink-0
                                            rounded-full
                                            sm:h-4
                                            sm:w-4
                                        "
                                        style={{
                                            backgroundColor:
                                                transaction.category_color,
                                        }}
                                    />

                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                font-medium
                                                text-slate-800
                                            "
                                        >
                                            {
                                                transaction.description
                                            }
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                truncate
                                                text-xs
                                                text-slate-500
                                            "
                                        >
                                            {
                                                transaction.category
                                            }
                                        </p>

                                    </div>

                                </div>

                                {/* Right side */}
                                <div
                                    className="
                                        shrink-0
                                        text-right
                                    "
                                >

                                    <p
                                        className={
                                            transaction.type ===
                                            "income"
                                                ? "text-sm font-semibold text-emerald-600"
                                                : "text-sm font-semibold text-red-600"
                                        }
                                    >
                                        {
                                            transaction.type ===
                                            "income"
                                                ? "+"
                                                : "-"
                                        }
                                        $
                                        {Number(
                                            transaction.amount
                                        ).toFixed(2)}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        {
                                            transaction.transaction_date
                                        }
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </Card>

    );
}