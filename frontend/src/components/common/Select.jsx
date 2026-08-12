import { ChevronDown } from "lucide-react";

// Reusable styled select component
export default function Select({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder,
    error,
    disabled = false,
    className = "",
}) {

    return (
        <div className="w-full">

            {label && (
                <label
                    htmlFor={name}
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-700
                    "
                >
                    {label}
                </label>
            )}

            <div className="relative">

                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3
                        pr-10
                        text-sm
                        text-slate-700
                        outline-none
                        transition-all
                        duration-200
                        cursor-pointer

                        border-slate-200

                        hover:border-slate-300

                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100

                        disabled:cursor-not-allowed
                        disabled:bg-slate-50
                        disabled:text-slate-400

                        ${error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : ""
                        }

                        ${className}
                    `}
                >

                    {placeholder && (
                        <option value="">
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}

                </select>

                <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}

        </div>
    );
}