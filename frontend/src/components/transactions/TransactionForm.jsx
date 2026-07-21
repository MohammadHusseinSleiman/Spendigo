// Transaction form component
export default function TransactionForm({
    form,
    errors,
    loading,
    categories,
    onChange,
    onSubmit,
    onCancel,
    submitText = "Save Transaction",
}) {

    return (

        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Transaction Type */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Type
                </label>

                <select
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    className="w-full rounded-xl border p-3"
                >
                    <option value="expense">
                        Expense
                    </option>
                    <option value="income">
                        Income
                    </option>
                </select>

            </div>

            {/* Category */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Category
                </label>

                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={onChange}
                    className="w-full rounded-xl border p-3"
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                {errors.category_id && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.category_id}
                    </p>
                )}

            </div>

            {/* Description */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>

                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    className="w-full rounded-xl border p-3"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                    </p>
                )}

            </div>

            {/* Amount */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Amount
                </label>

                <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="amount"
                    value={form.amount}
                    onChange={onChange}
                    className="w-full rounded-xl border p-3"
                />

                {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.amount}
                    </p>
                )}

            </div>

            {/* Date */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Date
                </label>

                <input
                    type="date"
                    name="transaction_date"
                    value={form.transaction_date}
                    onChange={onChange}
                    className="w-full rounded-xl border p-3"
                />

                {errors.transaction_date && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.transaction_date}
                    </p>
                )}

            </div>

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