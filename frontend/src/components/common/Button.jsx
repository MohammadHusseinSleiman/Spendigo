export default function Button({
    children,
    type = "button",
    onClick,
    disabled = false
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="
                w-full
                rounded-xl
                bg-emerald-600
                px-4
                py-3
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-emerald-700
                hover:shadow-md
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
            "
        >
            {children}
        </button>
    );
}