import Card from "./Card";

// Displays a financial statistic
export default function StatCard({
    title,
    value,
    icon: Icon,
    iconColor = "",
}) {

    return (
        <Card
            className="
                min-w-0
                p-4
                sm:p-6
            "
        >

            <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                    <p
                        className="
                            truncate
                            text-sm
                            text-slate-500

                            dark:text-slate-400
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-2
                            truncate
                            text-2xl
                            font-bold
                            text-slate-900

                            dark:text-slate-100

                            sm:text-3xl
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-white
                        sm:h-12
                        sm:w-12
                        ${iconColor}
                    `}
                >
                    <Icon size={24} />
                </div>

            </div>

        </Card>
    );
}