import {
    Bell,
    Menu,
    Moon,
    Sun,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { useTheme } from "../../context/ThemeContext";

import NotificationDropdown from "../notifications/NotificationDropdown";
import { useNotifications } from "../../context/NotificationContext";

import PageTitle from "../common/PageTitle";
import UserMenu from "./UserMenu";

// Responsive top navigation bar
export default function Topbar({
    title,
    description,
    onMenuClick,
}) {

    const [openNotifications, setOpenNotifications] = useState(false);

    const notificationRef = useRef(null);

    const {
        notifications,
        markAsRead,
        removeNotification,
        clearNotifications,
        markAllAsRead,
    } = useNotifications();

    const unreadCount =
        notifications.filter(
            (notification) => !notification.read
        ).length;

    const {
        darkMode,
        toggleTheme,
        loading: themeLoading,
    } = useTheme();

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {
                setOpenNotifications(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <header
            className="
                fixed
                left-0
                right-0
                top-0
                z-40

                flex
                min-h-16
                items-center
                justify-between
                gap-3
                border-b
                border-slate-200
                bg-white
                px-4
                py-3

                sm:px-6
                lg:left-64
                lg:px-8

                dark:border-slate-800
                dark:bg-slate-900
            "
        >

            {/* Mobile menu button */}
            <button
                type="button"
                onClick={onMenuClick}
                className="
                    cursor-pointer
                    rounded-xl
                    p-2
                    text-slate-600
                    transition
                    hover:bg-slate-100
                    lg:hidden

                    dark:text-slate-300
                    dark:hover:bg-slate-800
                "
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            {/* Page title */}
            <div className="min-w-0 flex-1">

                <PageTitle
                    title={title}
                    description={description}
                />

            </div>

            {/* Actions */}
            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    sm:gap-3
                "
            >



                {/* Notifications */}
                <div
                    ref={notificationRef}
                    className="relative"
                >

                    <button
                        type="button"
                        onClick={() =>
                            setOpenNotifications(
                                (previous) => !previous
                            )
                        }
                        className="
                            relative
                            cursor-pointer
                            rounded-xl
                            p-2
                            text-slate-700
                            transition
                            hover:bg-slate-100

                            dark:text-slate-200
                            dark:hover:bg-slate-800
                        "
                        aria-label="Notifications"
                    >

                        <Bell size={22} />

                        {unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -right-1
                                    -top-1
                                    flex
                                    h-5
                                    min-w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    px-1
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                {unreadCount}
                            </span>

                        )}

                    </button>

                    <NotificationDropdown
                        open={openNotifications}
                        notifications={notifications}
                        markAsRead={markAsRead}
                        removeNotification={removeNotification}
                        clearNotifications={clearNotifications}
                        markAllAsRead={markAllAsRead}
                    />

                </div>

                {/* Dark / Light mode */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    disabled={themeLoading}
                    aria-label={
                        darkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    title={
                        darkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    className="
                        cursor-pointer
                        rounded-xl
                        text-slate-700
                        transition
                        p-1
                        lg:p-2
                        hover:bg-slate-100

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        dark:text-slate-200
                        dark:hover:bg-slate-800
                    "
                >
                    {darkMode ? (
                        <Sun size={23} />
                    ) : (
                        <Moon size={23} />
                    )}
                </button>

                {/* User menu */}
                <UserMenu />

            </div>

        </header>

    );
}