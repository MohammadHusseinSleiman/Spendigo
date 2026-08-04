import {
    LayoutDashboard,
    Wallet,
    Tags,
    ChartColumn,
    Settings,
    LogOut,
} from "lucide-react";

import Logo from "../common/Logo";
import NavItem from "./NavItem";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

// Main application sidebar
export default function Sidebar() {

    const { logout } = useAuth();

    return (

        <aside
            className="
                flex
                h-screen
                w-64
                flex-col
                border-r
                border-slate-200
                bg-white
                p-6
            "
        >

            <Logo size="text-3xl" />

            <nav className="mt-10 space-y-2">

                <NavItem
                    to="/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                />

                <NavItem
                    to="/transactions"
                    icon={Wallet}
                    label="Transactions"
                />

                <NavItem
                    to="/categories"
                    icon={Tags}
                    label="Categories"
                />

                <NavItem
                    to="/reports"
                    icon={ChartColumn}
                    label="Reports"
                />

                <NavItem
                    to="/settings"
                    icon={Settings}
                    label="Settings"
                />

            </nav>

            <div className="mt-auto">
                <Button
                    onClick={logout}
                >
                    <div className="flex items-center justify-center gap-2">
                        <LogOut size={18} />
                        Logout
                    </div>
                </Button>
            </div>

        </aside>
    );
}