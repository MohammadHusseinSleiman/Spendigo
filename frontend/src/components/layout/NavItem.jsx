import { NavLink } from "react-router-dom";

// Sidebar navigation item
export default function NavItem({
    to,
    icon: Icon,
    label,
}) {

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                    isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : `
                            text-slate-600
                            hover:bg-slate-100
                            hover:text-slate-900

                            dark:text-slate-400
                            dark:hover:bg-slate-800
                            dark:hover:text-slate-100
                        `
                }
                `
            }
        >
            <Icon size={20} />
            <span>{label}</span>
        </NavLink>
    );
}