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
                absolute
                right-0
                top-12
                w-80
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-xl
                border
                border-slate-200
                z-50
            "
        >

            <div className="p-4 border-b">
                <h3 className="font-semibold">
                    Notifications
                </h3>
            </div>

            {
                notifications.length === 0 ?
                (
                    <p className="p-6 text-center text-slate-500">
                        No notifications yet.
                    </p>
                )
                :
                notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onRead={markAsRead}
                        onDelete={removeNotification}
                    />
                ))
            }

            {
                notifications.length > 0 && (

                    <div
                        className="
                            flex
                            justify-between
                            border-t
                            p-3
                        "
                    >

                        <button
                            type="button"
                            onClick={markAllAsRead}
                            className="
                                text-sm
                                text-emerald-600
                            "
                        >
                            Mark all as read
                        </button>

                        <button
                            type="button"
                            onClick={clearNotifications}
                            className="
                                text-sm
                                text-red-600
                            "
                        >
                            Clear all
                        </button>

                    </div>

                )
            }

        </div>

    );
}