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
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                p-3
                                text-left
                                transition
                                hover:border-emerald-300
                                hover:bg-emerald-50
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