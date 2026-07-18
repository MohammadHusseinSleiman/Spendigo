export default function PageTitle({
    title,
    description,
}) {
    return (
        <div className="space-y-2">
            <h1
                className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-slate-900
                "
            >
                {title}
            </h1>

            <p
                className="
                    text-sm
                    text-slate-500
                "
            >
                {description}
            </p>
        </div>
    );
}