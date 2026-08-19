import Select from "../common/Select";

import { TRANSACTION_TYPE_OPTIONS } from "../../constants/transactionOptions";
import Button from "../common/Button";
import Input from "../common/Input";

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
                <Input
                    name="name"
                    value={form.name ?? ""}
                    onChange={onChange}
                    error={errors.name}
                />
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
                <Select
                    name="type"
                    value={form.type ?? "expense"}
                    onChange={onChange}
                    options={TRANSACTION_TYPE_OPTIONS}
                    className="min-h-[50px]"
                />
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