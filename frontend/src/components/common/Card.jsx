// Reusable card container used across the application

export default function Card({
    children,
    className = "",
}) {

    return (

        <div
            className={`
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-colors
                duration-200

                dark:border-slate-800
                dark:bg-slate-900

                ${className}
            `}
        >
            {children}
        </div>

    );

}