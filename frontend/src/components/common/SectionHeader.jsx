// Section title used inside pages
export default function SectionHeader({
    title,
    action,
}) {
    return (
        <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-slate-900">
                {title}
            </h2>

            {action}

        </div>
    );
}