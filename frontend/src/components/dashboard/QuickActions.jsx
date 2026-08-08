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

        <Card className="mt-8">

            <h2
                className="
                    mb-5
                    text-xl
                    font-semibold
                "
            >
                Quick Actions
            </h2>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >

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
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                p-4
                                text-left
                                transition
                                hover:border-emerald-300
                                hover:bg-emerald-50
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