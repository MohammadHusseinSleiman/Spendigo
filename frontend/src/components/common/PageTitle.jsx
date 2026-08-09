export default function PageTitle({
    title,
    description,
}) {
    return (
        <div className="min-w-0">
            <h1
                className="
                    truncate
                    text-xl
                    font-bold
                    text-slate-900
                    sm:text-xl
                "
            >
                {title}
            </h1>

            <p
                className="
                    truncate
                    text-xs
                    text-slate-500
                    sm:text-sm
                "
            >
                {description}
            </p>
        </div>
    );
}