import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({
    notifications,
    open,
    markAsRead,
    clearNotifications,
    removeNotification,
    markAllAsRead,
}) {

    if (!open) return null;

    return (
        <div
            className="
                fixed
                left-4
                right-4
                top-16
                z-50
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl

                dark:border-slate-800
                dark:bg-slate-900

                md:absolute
                md:left-auto
                md:right-0
                md:top-12
                md:w-80
            "
        >

            <div
                className="
                    border-b
                    border-slate-200
                    p-4

                    dark:border-slate-800
                "
            >
                <h3
                    className="
                        font-semibold
                        text-slate-900
                        dark:text-slate-100
                    "
                >
                    Notifications
                </h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">

                {notifications.length === 0 ? (

                    <p
                        className="
                            p-6
                            text-center
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        No notifications yet.
                    </p>

                ) : (

                    notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={markAsRead}
                            onDelete={removeNotification}
                        />
                    ))

                )}

            </div>

            {notifications.length > 0 && (

                <div
                    className="
                        flex
                        flex-wrap
                        justify-between
                        gap-3
                        border-t
                        border-slate-200
                        p-3

                        dark:border-slate-800
                    "
                >

                    <button
                        type="button"
                        onClick={markAllAsRead}
                        className="
                            cursor-pointer
                            text-sm
                            text-emerald-600
                            hover:text-emerald-700
                        "
                    >
                        Mark all as read
                    </button>

                    <button
                        type="button"
                        onClick={clearNotifications}
                        className="
                            cursor-pointer
                            text-sm
                            text-red-600
                            hover:text-red-700
                        "
                    >
                        Clear all
                    </button>

                </div>

            )}

        </div>
    );
}