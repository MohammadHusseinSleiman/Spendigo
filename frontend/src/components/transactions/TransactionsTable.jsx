import {
    ArrowDownCircle,
    ArrowUpCircle,
    Pencil,
    Trash2,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

// Transactions table
export default function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
}) {

    if (transactions.length === 0) {
        return (
            <EmptyState
                title="No transactions found"
                description="Try adjusting your filters or add a new transaction to get started."
            />
        );
    }

    return (

        <Card className="mt-6 min-w-0 overflow-hidden p-0">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                    <thead
                        className="
                            bg-slate-50
                            text-left
                            text-slate-700
                            dark:border-slate-700
                            dark:bg-slate-900/60
                        "
                    >
                        <tr>
                            <th className="px-4 py-4 text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Type
                            </th>
                            <th className="px-4 py-4 text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Description
                            </th>
                            <th className="px-4 py-4 text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Category
                            </th>
                            <th className="px-4 py-4 text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Amount
                            </th>
                            <th className="px-4 py-4 text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Date
                            </th>
                            <th className="px-4 py-4 text-center text-sm font-semibold sm:px-6 dark:text-slate-100">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="
                                    border-t
                                    border-slate-100
                                    transition
                                    hover:bg-slate-50
                                    dark:hover:bg-slate-700/40
                                "
                            >

                                {/* Type */}
                                <td className="px-4 py-4 sm:px-6">
                                    <Badge
                                        variant={
                                            transaction.type === "income"
                                                ? "success"
                                                : "danger"
                                        }
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {transaction.type === "income" ? (
                                                <ArrowUpCircle size={15} />
                                            ) : (
                                                <ArrowDownCircle size={15} />
                                            )}
                                            {transaction.type === "income"
                                                ? "Income"
                                                : "Expense"}
                                        </span>
                                    </Badge>
                                </td>

                                {/* Description */}
                                <td className="max-w-[220px] px-4 py-4 sm:px-6">
                                    <span
                                        className="
                                            block
                                            truncate
                                            font-medium
                                            text-slate-800
                                            dark:text-slate-100
                                        "
                                        title={transaction.description}
                                    >
                                        {transaction.description}
                                    </span>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-4 sm:px-6">
                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            whitespace-nowrap
                                            text-sm
                                            text-slate-600
                                            dark:text-slate-400
                                        "
                                    >
                                        <span
                                            className="
                                                h-3
                                                w-3
                                                shrink-0
                                                rounded-full
                                            "
                                            style={{
                                                backgroundColor:
                                                    transaction.category_color,
                                            }}
                                        />
                                        {transaction.category}
                                    </span>
                                </td>

                                {/* Amount */}
                                <td
                                    className={`
                                        whitespace-nowrap
                                        px-4
                                        py-4
                                        font-semibold
                                        ${
                                            transaction.type === "income"
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-red-500 dark:text-red-400"
                                        }
                                    `}
                                >
                                    {transaction.type === "income"
                                        ? "+"
                                        : "-"}
                                    ${Number(
                                        transaction.amount
                                    ).toFixed(2)}
                                </td>

                                {/* Date */}
                                <td
                                    className="
                                        whitespace-nowrap
                                        px-4
                                        py-4
                                        text-sm
                                        text-slate-500
                                        sm:px-6
                                        dark:text-slate-400
                                    "
                                >
                                    {transaction.transaction_date}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4 sm:px-6">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit(transaction.id)
                                            }
                                            className="
                                                cursor-pointer
                                                rounded-lg
                                                p-2
                                                text-blue-600
                                                transition
                                                hover:bg-blue-50
                                            "
                                            title="Edit transaction"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => 
                                                onDelete(transaction.id)
                                            }
                                            className="
                                                cursor-pointer
                                                rounded-lg
                                                p-2
                                                text-red-600
                                                transition
                                                hover:bg-red-50
                                            "
                                            title="Delete transaction"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </Card>

    );
}