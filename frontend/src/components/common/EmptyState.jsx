// Reusable empty state component
export default function EmptyState({
    title = "No data found",
    description = "",
}) {
    return (
        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-12
                text-center

                dark:border-slate-700
                dark:bg-slate-800
            "
        >

            <h3
                className="
                    text-lg
                    font-semibold
                    text-slate-800
                    dark:text-slate-100
                "
            >
                {title}
            </h3>

            {description && (
                <p
                    className="
                        mt-2
                        max-w-md
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    {description}
                </p>
            )}

        </div>
    );
}