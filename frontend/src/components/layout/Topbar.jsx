import { Bell } from "lucide-react";
import { useState } from "react";

import NotificationDropdown from "../notifications/NotificationDropdown";
import { useNotifications } from "../../context/NotificationContext";

import PageTitle from "../common/PageTitle";
import UserMenu from "./UserMenu";

// Top navigation bar
export default function Topbar({
    title,
    description,
}) {

    const [openNotifications, setOpenNotifications] = useState(false);
    const {
        notifications,
        markAsRead,
        removeNotification,
        clearNotifications,
        markAllAsRead
    } = useNotifications();
    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;

    return (

        <header
            className="
                flex
                h-16
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                px-8
            "
        >

            <PageTitle
                title={title}
                description={description}
            />

            <div className="relative">
                <button
                    type="button"
                    onClick={() =>
                        setOpenNotifications(
                            !openNotifications
                        )
                    }
                    className="
                        relative
                        rounded-xl
                        p-2
                        transition
                        hover:bg-slate-100
                    "
                >
                    <Bell size={22} />
                    {
                        unreadCount > 0 && (
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
                        )
                    }
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

            <UserMenu />

        </header>

    );

}