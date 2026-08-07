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
            "
        >

            <h3
                className="
                    text-lg
                    font-semibold
                    text-slate-800
                "
            >
                {title}
            </h3>

            {
                description && (
                    <p
                        className="
                            mt-2
                            max-w-md
                            text-sm
                            text-slate-500
                        "
                    >
                        {description}
                    </p>
                )
            }

        </div>
    );
}