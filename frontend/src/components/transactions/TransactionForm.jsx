import Button from "../common/Button";
import Select from "../common/Select";
import Input from "../common/Input";

import { TRANSACTION_TYPE_OPTIONS } from "../../constants/transactionOptions";
import { mapCategoriesToOptions } from "../../utils/selectOptions";

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

    const categoryOptions = mapCategoriesToOptions(categories);

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

                <Select
                    name="type"
                    value={form.type}
                    onChange={onChange}
                    options={TRANSACTION_TYPE_OPTIONS}
                    className="min-h-[50px]"
                />

            </div>

            {/* Category */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Category
                </label>

                <Select
                    name="category_id"
                    value={form.category_id}
                    onChange={onChange}
                    options={categoryOptions}
                    className="min-h-[50px]"
                />

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

                <Input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={onChange}
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

                <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    name="amount"
                    value={form.amount}
                    onChange={onChange}
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

                <Input
                    type="date"
                    name="transaction_date"
                    value={form.transaction_date}
                    onChange={onChange}
                />

                {errors.transaction_date && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.transaction_date}
                    </p>
                )}

            </div>

            <div
                className="
                    flex
                    flex-col-reverse
                    gap-3
                    sm:flex-row
                    sm:justify-end
                "
            >

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="
                        border
                        cursor-pointer
                        w-full
                        sm:w-auto
                    "
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        bg-emerald-600
                        font-medium
                        text-white
                        cursor-pointer
                        hover:bg-emerald-700
                        sm:w-auto
                    "
                >
                    {loading
                        ? "Saving..."
                        : submitText}
                </Button>

            </div>

        </form>
    );
}