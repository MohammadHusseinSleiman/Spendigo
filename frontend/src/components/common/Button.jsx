// Reusable button component

export default function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    variant = "primary",
    className = "",
}) {

    const variants = {

        primary: `
            bg-emerald-600
            text-white
            hover:bg-emerald-700
            dark:bg-emerald-600
            dark:hover:bg-emerald-500
        `,

        secondary: `
            border
            border-slate-200
            bg-white
            text-slate-700
            hover:bg-slate-50

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            dark:hover:bg-slate-800
        `,

        danger: `
            bg-red-600
            text-white
            hover:bg-red-700
            dark:bg-red-600
            dark:hover:bg-red-500
        `,

        ghost: `
            bg-transparent
            text-slate-700
            hover:bg-slate-100

            dark:text-slate-300
            dark:hover:bg-slate-800
        `,
    };

    return (

        <button

            type={type}
            onClick={onClick}
            disabled={disabled}

            className={`
                cursor-pointer
                inline-flex
                items-center
                justify-center
                rounded-xl
                px-4
                py-2.5
                font-semibold
                shadow-sm
                transition-all
                duration-200
                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-60

                ${variants[variant] ?? variants.primary}

                ${className}
            `}
        >
            {children}
        </button>

    );

}