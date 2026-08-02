// Category form component
export default function CategoryForm({
    form,
    errors,
    loading,
    onChange,
    onSubmit,
    onCancel,
    submitText = "Save Category",
}) {

    return (

        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Category name */}
            <div>
                <label
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    "
                >
                    Name
                </label>
                <input
                    name="name"
                    value={form.name ?? ""}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-2.5
                        outline-none
                        focus:border-emerald-500
                    "
                />
                {
                    errors.name && (
                        <p
                            className="
                                mt-1
                                text-sm
                                text-red-600
                            "
                        >
                            {errors.name}
                        </p>
                    )
                }
            </div>

            {/* Category type */}
            <div>
                <label
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    "
                >
                    Type
                </label>
                <select
                    name="type"
                    value={form.type ?? "expense"}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-2.5
                        outline-none
                        focus:border-emerald-500
                    "
                >
                    <option value="income">
                        Income
                    </option>
                    <option value="expense">
                        Expense
                    </option>
                </select>
            </div>

            {/* Category color */}
            <div>
                <label
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                    "
                >
                    Color
                </label>
                <input
                    type="color"
                    name="color"
                    value={form.color ?? "#2563EB"}
                    onChange={onChange}
                    className="
                        h-12
                        w-20
                        cursor-pointer
                        rounded-lg
                    "
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        rounded-xl
                        border
                        px-5
                        py-3
                    "
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                        disabled:opacity-60
                    "
                >
                    {loading
                        ? "Saving..."
                        : submitText}
                </button>
            </div>

        </form>
    );
}