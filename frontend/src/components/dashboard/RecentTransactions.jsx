import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Badge from "../common/Badge";

// Latest transactions table
export default function RecentTransactions({ transactions }) {

    const navigate = useNavigate();

    return (

        <Card>

            <div
                className="
                    mb-6
                    flex
                    items-center
                    justify-between
                "
            >

                <h2
                    className="
                        text-xl
                        font-semibold
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
                        text-sm
                        font-medium
                        text-emerald-600
                        cursor-pointer
                        hover:underline
                    "
                >
                    View All →
                </button>

            </div>

            {
                transactions.length === 0 ?
                (
                    <p
                        className="
                            text-center
                            text-slate-500
                        "
                    >
                        No recent transactions.
                    </p>
                )
                :
                <div className="space-y-4">
                    {
                        transactions.map(transaction => (
                            <div
                                key={transaction.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-xl
                                    border
                                    border-slate-200
                                    p-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            h-4
                                            w-4
                                            rounded-full
                                        "
                                        style={{
                                            backgroundColor:
                                                transaction.category_color,
                                        }}
                                    />

                                    <div>

                                        <p
                                            className="
                                                font-medium
                                            "
                                        >
                                            {transaction.category}
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                text-slate-500
                                            "
                                        >
                                            {transaction.description}
                                        </p>

                                    </div>

                                </div>

                                <div
                                    className="
                                        text-right
                                    "
                                >

                                    <p
                                        className={
                                            transaction.type === "income"
                                                ? "font-semibold text-emerald-600"
                                                : "font-semibold text-red-600"
                                        }
                                    >
                                        {
                                            transaction.type === "income"
                                                ? "+"
                                                : "-"
                                        }
                                        $
                                        {transaction.amount.toFixed(2)}
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        {transaction.transaction_date}
                                    </p>

                                </div>

                            </div>
                        ))
                    }
                </div>
            }
        </Card>
    );
}