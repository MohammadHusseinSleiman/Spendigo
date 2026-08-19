import {
    Plus,
    Tags,
    BarChart3,
    Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../common/Card";

// Dashboard quick actions
export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            label: "Add Transaction",
            icon: Plus,
            path: "/transactions",
        },

        {
            label: "Categories",
            icon: Tags,
            path: "/categories",
        },

        {
            label: "Reports",
            icon: BarChart3,
            path: "/reports",
        },

        {
            label: "Settings",
            icon: Settings,
            path: "/settings",
        },

    ];

    return (

        <Card
            className="
                mt-0
                min-w-0
                p-4
                sm:p-6
            "
        >

            <h2
                className="
                    mb-4
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                    sm:mb-5
                    sm:text-xl
                "
            >
                Quick Actions
            </h2>

            <div className="grid gap-3">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.label}
                            type="button"
                            onClick={() =>
                                navigate(action.path)
                            }
                            className="
                                flex
                                w-full
                                cursor-pointer
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                p-3
                                text-left
                                transition-all
                                duration-200
                                hover:border-emerald-300
                                hover:bg-emerald-50
                                focus:outline-none
                                focus:ring-2
                                focus:ring-emerald-500
                                focus:ring-offset-2
                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:hover:border-emerald-700
                                dark:hover:bg-emerald-950/30
                                dark:focus:ring-offset-slate-900
                                sm:p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-emerald-100
                                    text-emerald-600
                                    dark:bg-emerald-950
                                    dark:text-emerald-400
                                "
                            >
                                <Icon size={20} />
                            </div>

                            <span
                                className="
                                    truncate
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    dark:text-slate-200
                                "
                            >
                                {action.label}
                            </span>

                        </button>

                    );
                })}

            </div>

        </Card>
    );
}