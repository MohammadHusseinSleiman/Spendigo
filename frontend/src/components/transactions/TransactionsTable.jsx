import {
    ArrowDownCircle,
    ArrowUpCircle,
    Pencil,
    Trash2,
} from "lucide-react";

import { toast } from "sonner";

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
                description="You haven't added any transactions yet."
            />
        );
    }

    return (

        <Card className="overflow-hidden p-0 mt-8">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead
                        className="
                            bg-slate-50
                            text-left
                        "
                    >
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold">
                                Type
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold">
                                Description
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold">
                                Category
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-sm font-semibold">
                                Date
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">
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
                                "
                            >

                                {/* Type */}
                                <td className="px-6 py-4">
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
                                <td className="px-6 py-4">
                                    <span className="font-medium text-slate-800">
                                        {transaction.description}
                                    </span>
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4">
                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-slate-600
                                        "
                                    >
                                        <span
                                            className="
                                                h-3
                                                w-3
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
                                        px-6
                                        py-4
                                        font-semibold
                                        ${
                                            transaction.type === "income"
                                                ? "text-emerald-600"
                                                : "text-red-500"
                                        }
                                    `}
                                >
                                    {transaction.type === "income"
                                        ? "+"
                                        : "-"}
                                    $
                                    {Number(
                                        transaction.amount
                                    ).toFixed(2)}
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {transaction.transaction_date}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit(transaction.id)
                                            }
                                            className="
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
                                            onClick={() => {
                                                toast.warning("This action cannot be undone.");
                                                onDelete(transaction.id);
                                            }}
                                            className="
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