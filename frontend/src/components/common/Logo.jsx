export default function Logo({
    size = "text-4xl",
}) {
    return (
        <h1
            className={`
                ${size}
                font-extrabold
                tracking-tight
                text-emerald-600
                select-none
            `}
        >
            Spendigo
        </h1>
    );
}