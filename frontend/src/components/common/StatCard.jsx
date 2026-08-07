import Card from "./Card";

// Displays a financial statistic
export default function StatCard({
    title,
    value,
    icon: Icon,
    iconColor = "text-emerald-600",
}) {

    return (
        <Card>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className={`
                        rounded-xl
                        bg-slate-100
                        p-3
                        ${iconColor}
                    `}
                >
                    <Icon size={24} />
                </div>

            </div>

        </Card>
    );
}