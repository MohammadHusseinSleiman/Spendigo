import {
    Bell,
    Menu,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

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
            notification => !notification.read
        ).length;

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
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
                    gap-3
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
                                previous => !previous
                            )
                        }
                        className="
                            relative
                            rounded-xl
                            p-2
                            transition
                            cursor-pointer
                            hover:bg-slate-100
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

                {/* User menu */}
                <UserMenu />

            </div>

        </header>

    );
}