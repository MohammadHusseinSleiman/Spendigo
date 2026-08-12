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
                overflow-x-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl

                md:w-80
                md:absolute
                md:left-auto
                md:right-0
                md:top-12
                md:w-80
                md:max-h-none
                md:overflow-hidden

                lg:absolute
                lg:left-auto
                lg:right-0
                lg:top-12
                lg:w-80
                lg:max-h-none
                lg:overflow-hidden
            "
        >

            <div className="p-4 border-b">
                <h3 className="font-semibold">
                    Notifications
                </h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
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
            </div>

            {
                notifications.length > 0 && (

                    <div
                        className="
                            flex
                            flex-wrap
                            justify-between
                            gap-3
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
                                cursor-pointer
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
                                cursor-pointer
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