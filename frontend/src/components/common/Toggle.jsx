// Reusable toggle switch component

export default function Toggle({
    checked = false,
    onChange,
    disabled = false,
    label,
}) {

    return (
        <div className="flex items-center justify-between">

            {label && (
                <span className="font-medium text-slate-700">
                    {label}
                </span>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`
                    relative
                    inline-flex
                    h-6
                    w-11
                    shrink-0
                    cursor-pointer
                    items-center
                    rounded-full
                    transition-colors
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                    focus:ring-offset-2
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${
                        checked
                            ? "bg-emerald-600"
                            : "bg-slate-300"
                    }
                `}
            >

                <span
                    className={`
                        inline-block
                        h-5
                        w-5
                        transform
                        rounded-full
                        bg-white
                        shadow
                        transition-transform
                        duration-200
                        ${
                            checked
                                ? "translate-x-5"
                                : "translate-x-0.5"
                        }
                    `}
                />

            </button>

        </div>
    );
}