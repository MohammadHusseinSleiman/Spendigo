import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

import formatCurrency from "../../utils/formatCurrency";

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
                        text-slate-900
                        dark:text-slate-100
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
                        cursor-pointer
                        self-start
                        text-sm
                        font-medium
                        text-emerald-600
                        transition
                        hover:text-emerald-700
                        hover:underline
                        dark:text-emerald-400
                        dark:hover:text-emerald-300
                        sm:self-auto
                    "
                >
                    View All →
                </button>

            </div>


            {/* Empty state */}

            {transactions.length === 0 ? (

                <EmptyState
                    title="No transactions found"
                    description="You haven't added any transactions yet."
                />

            ) : (

                <div
                    className="
                        divide-y
                        divide-slate-100
                        dark:divide-slate-800
                    "
                >

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
                                                dark:text-slate-200
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
                                                dark:text-slate-400
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
                                                ? `
                                                    text-sm
                                                    font-semibold
                                                    text-emerald-600
                                                    dark:text-emerald-400
                                                `
                                                : `
                                                    text-sm
                                                    font-semibold
                                                    text-red-600
                                                    dark:text-red-400
                                                `
                                        }
                                    >
                                        {
                                            transaction.type ===
                                            "income"
                                                ? "+"
                                                : "-"
                                        }

                                        {formatCurrency(
                                            Number(
                                                transaction.amount
                                            )
                                        )}

                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-500
                                            dark:text-slate-400
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