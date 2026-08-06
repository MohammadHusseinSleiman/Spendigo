import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from "lucide-react";

import { toast } from "sonner";

// Transactions table
export default function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
}) {

    if (transactions.length === 0) {

        return (
            <div
                className="
                    rounded-2xl
                    bg-white
                    p-12
                    text-center
                    shadow-sm
                "
            >
                <h3 className="text-lg font-semibold">
                    No transactions found
                </h3>

                <p className="mt-2 text-slate-500">
                    Add your first transaction to get started.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-sm
            "
        >
            <table className="w-full">

                <thead
                    className="
                        bg-slate-50
                        text-left
                    "
                >

                    <tr>
                        <th className="px-6 py-4">
                            Type
                        </th>
                        <th className="px-6 py-4">
                            Description
                        </th>
                        <th className="px-6 py-4">
                            Category
                        </th>
                        <th className="px-6 py-4">
                            Amount
                        </th>
                        <th className="px-6 py-4">
                            Date
                        </th>
                        <th className="px-6 py-4 text-center">
                            Actions
                        </th>
                    </tr>

                </thead>

                <tbody>
                    {transactions.map(transaction => (
                        <tr
                            key={transaction.id}
                            className="
                                border-t
                            "
                        >

                            <td className="px-6 py-4">
                                {transaction.type === "income"
                                    ? <ArrowUpCircle className="text-emerald-600"/>
                                    : <ArrowDownCircle className="text-red-500"/>
                                }
                            </td>

                            <td className="px-6 py-4">
                                {transaction.description}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className="inline-flex items-center gap-2"
                                >
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            background: transaction.category_color
                                        }}
                                    />
                                    {transaction.category}
                                </span>
                            </td>

                            <td
                                className={`
                                    px-6 py-4 font-semibold
                                    ${
                                        transaction.type === "income"
                                        ? "text-emerald-600"
                                        : "text-red-500"
                                    }
                                `}
                            >
                                ${Number(
                                    transaction.amount
                                ).toFixed(2)}
                            </td>

                            <td className="px-6 py-4">
                                {transaction.transaction_date}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">

                                    <button
                                        onClick={() => onEdit(transaction.id)}
                                        className="
                                            rounded-lg
                                            p-2
                                            text-blue-600
                                            transition
                                            hover:bg-blue-50
                                        "
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => {
                                            onDelete(transaction.id);
                                            toast.warning("This action cannot be undone.");
                                        }}
                                        className="
                                            rounded-lg
                                            p-2
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                        "
                                        title="Delete"
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
    );
}