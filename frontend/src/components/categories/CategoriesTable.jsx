import { Pencil, Trash2 } from "lucide-react";

import { toast } from "sonner";

import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

// Categories table
export default function CategoriesTable({
    categories,
    onEdit,
    onDelete,
}) {

    if (categories.length === 0) {

        return (
            <EmptyState
                title="No categories found"
                description="Try adjusting your search or filter, or add a new category."
            />
        );
    }

    return (

        <Card className="mt-6 overflow-hidden p-0">

            <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[700px]">

                    <thead
                        className="
                            border-b
                            border-slate-200
                            bg-slate-50
                            text-left
                        "
                    >
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                                Name
                            </th>
                            <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                                Type
                            </th>
                            <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                                Color
                            </th>
                            <th className="px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4">
                                Source
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="
                                    border-b
                                    border-slate-100
                                    last:border-none
                                    transition
                                    hover:bg-slate-50
                                "
                            >

                                {/* Name */}
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <span className="font-medium text-slate-800">
                                        {category.name}
                                    </span>
                                </td>

                                {/* Type */}
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <Badge
                                        variant={
                                            category.type === "income"
                                                ? "success"
                                                : "danger"
                                        }
                                    >
                                        {category.type === "income"
                                            ? "Income"
                                            : "Expense"}
                                    </Badge>
                                </td>

                                {/* Color */}
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <span
                                        className="
                                            block
                                            h-6
                                            w-6
                                            rounded-full
                                            border
                                            border-slate-200
                                        "
                                        style={{
                                            backgroundColor:
                                                category.color,
                                        }}
                                    />
                                </td>

                                {/* Source */}
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <Badge
                                        variant={
                                            category.is_default
                                                ? "default"
                                                : "info"
                                        }
                                    >
                                        {category.is_default
                                            ? "Default"
                                            : "Custom"}
                                    </Badge>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <div className="flex justify-center gap-2">
                                        {!category.is_default && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onEdit(category)
                                                    }
                                                    className="
                                                        rounded-lg
                                                        p-2
                                                        text-blue-600
                                                        transition
                                                        hover:bg-blue-50
                                                    "
                                                    title="Edit category"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        toast.warning(
                                                            "This action cannot be undone."
                                                        );
                                                        onDelete(category);
                                                    }}
                                                    className="
                                                        rounded-lg
                                                        p-2
                                                        text-red-600
                                                        transition
                                                        hover:bg-red-50
                                                    "
                                                    title="Delete category"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
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