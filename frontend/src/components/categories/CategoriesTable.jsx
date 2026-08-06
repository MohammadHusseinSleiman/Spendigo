import { Pencil, Trash2 } from "lucide-react";

import { toast } from "sonner";

// Categories table
export default function CategoriesTable({
    categories,
    onEdit,
    onDelete,
}) {

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
                        border-b
                        bg-slate-50
                    "
                >
                    <tr>
                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Type
                        </th>

                        <th className="p-4 text-left">
                            Color
                        </th>

                        <th className="p-4 text-left">
                            Source
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        categories.map(
                            (category) => (

                                <tr
                                    key={category.id}
                                    className="
                                        border-b
                                        last:border-none
                                    "
                                >

                                    <td className="p-4">
                                        {category.name}
                                    </td>

                                    <td className="p-4">
                                        {category.type}
                                    </td>

                                    <td className="p-4">
                                        <div
                                            className="
                                                h-5
                                                w-5
                                                rounded-full
                                            "
                                            style={{
                                                backgroundColor:
                                                    category.color,
                                            }}
                                        />
                                    </td>

                                    <td className="p-4">
                                        {
                                            category.is_default
                                                ? "Default"
                                                : "Custom"
                                        }
                                    </td>

                                    <td className="px-6 py-4">
                                        {!category.is_default && (
                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => onEdit(category)}
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
                                                        onDelete(category);
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
                                        )}
                                    </td>

                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}