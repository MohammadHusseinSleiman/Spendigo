export default function Logo({
    size = "text-4xl"
}) {
    return (
        <h1
            className={`font-bold text-emerald-600 ${size}`}
        >
            Spendigo
        </h1>
    );
}