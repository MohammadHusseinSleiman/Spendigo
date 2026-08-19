// Reusable badge component used across the application

export default function Badge({
    children,
    variant = "default",
}) {

    const variants = {

        default: `
            bg-slate-100
            text-slate-700
            dark:bg-slate-700
            dark:text-slate-200
        `,

        success: `
            bg-emerald-100
            text-emerald-700
            dark:bg-emerald-900/40
            dark:text-emerald-400
        `,

        danger: `
            bg-red-100
            text-red-700
            dark:bg-red-900/40
            dark:text-red-400
        `,

        warning: `
            bg-amber-100
            text-amber-700
            dark:bg-amber-900/40
            dark:text-amber-400
        `,

        info: `
            bg-blue-100
            text-blue-700
            dark:bg-blue-900/40
            dark:text-blue-400
        `,
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium

                ${variants[variant] ?? variants.default}
            `}
        >
            {children}
        </span>
    );
}