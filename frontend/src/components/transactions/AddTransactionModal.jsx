import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import transactionService from "../../services/transactionService";

// Modal for creating a new transaction
export default function AddTransactionModal({
    isOpen,
    onClose,
    onSuccess,
}) {

    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        type: "expense",
        category_id: "",
        description: "",
        amount: "",
        transaction_date: today,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Load categories whenever the transaction type changes
    useEffect(() => {

        if (!isOpen) {
            return;
        }

        loadCategories();

    }, [
        form.type,
        isOpen,
    ]);
    async function loadCategories() {

        try {

            const data =
                await transactionService.getCategories(
                    form.type
                );
            setCategories(data);

            if (data.length > 0) {

                setForm(previous => ({
                    ...previous,
                    category_id: data[0].id,
                }));
            }

        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {

        const {
            name,
            value,
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();
        setErrors({});
        setLoading(true);

        try {

            await transactionService.create(form);
            onSuccess();
            onClose();

        } catch (error) {

            if (
                error.response?.status === 422
            ) {

                setErrors(
                    error.response.data.errors
                );

            } else {
                console.error(error);
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            title="Add Transaction"
            onClose={onClose}
        >

        <form
            onSubmit={handleSubmit}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onClick={onClose}
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
                        : "Save Transaction"}
                </button>

            </div>

        </form>

        </Modal>
    );
}