import {
    LayoutDashboard,
    Wallet,
    Tags,
    ChartColumn,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import Logo from "../common/Logo";
import Button from "../common/Button";
import NavItem from "./NavItem";

import { useAuth } from "../../context/AuthContext";

// Responsive application sidebar
export default function Sidebar({
    mobileOpen,
    setMobileOpen,
}) {

    const { logout } = useAuth();

    function handleNavigation() {
        setMobileOpen(false);
    }

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-slate-900/40
                        dark:bg-black/60
                        lg:hidden
                    "
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed
                    top-0
                    inset-y-0
                    left-0
                    z-50
                    flex
                    h-screen
                    w-64
                    flex-col
                    border-r
                    border-slate-200
                    bg-white
                    p-6
                    transition-transform
                    duration-300
                    ease-in-out
                    lg:translate-x-0

                    dark:border-slate-800
                    dark:bg-slate-900

                    ${
                        mobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* Sidebar header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >

                    <Logo size="text-3xl" />

                    {/* Mobile close button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(false)
                        }
                        className="
                            cursor-pointer
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                            lg:hidden

                            dark:text-slate-400
                            dark:hover:bg-slate-800
                            dark:hover:text-slate-200
                        "
                        aria-label="Close menu"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Navigation */}
                <nav className="mt-10 space-y-2">

                    <div onClick={handleNavigation}>
                        <NavItem
                            to="/dashboard"
                            icon={LayoutDashboard}
                            label="Dashboard"
                        />
                    </div>

                    <div onClick={handleNavigation}>
                        <NavItem
                            to="/transactions"
                            icon={Wallet}
                            label="Transactions"
                        />
                    </div>

                    <div onClick={handleNavigation}>
                        <NavItem
                            to="/categories"
                            icon={Tags}
                            label="Categories"
                        />
                    </div>

                    <div onClick={handleNavigation}>
                        <NavItem
                            to="/reports"
                            icon={ChartColumn}
                            label="Reports"
                        />
                    </div>

                    <div onClick={handleNavigation}>
                        <NavItem
                            to="/settings"
                            icon={Settings}
                            label="Settings"
                        />
                    </div>

                </nav>

                {/* Logout */}
                <div className="mt-auto">

                    <Button
                        onClick={logout}
                        className="w-full w-auto cursor-pointer"
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >
                            <LogOut size={18} />
                            Logout
                        </div>
                    </Button>

                </div>

            </aside>
        </>
    );
}