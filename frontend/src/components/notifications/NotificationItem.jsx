import { Check, Trash2 } from "lucide-react";

export default function NotificationItem({
    notification,
    onRead,
    onDelete,
}) {

    return (
        <div
            className="
                flex
                items-start
                justify-between
                border-b
                border-slate-100
                px-4
                py-3
                transition
                last:border-none
                hover:bg-slate-50

                dark:border-slate-800
                dark:hover:bg-slate-800/60
            "
        >

            <div className="min-w-0 flex-1">

                <p
                    className={
                        notification.read
                            ? `
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            `
                            : `
                                text-sm
                                font-semibold
                                text-slate-900
                                dark:text-slate-100
                            `
                    }
                >
                    {notification.message}
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-400
                        dark:text-slate-500
                    "
                >
                    {new Date(
                        notification.created_at
                    ).toLocaleString()}
                </p>

            </div>

            <div className="ml-3 flex shrink-0 gap-2">

                {!notification.read && (
                    <button
                        type="button"
                        onClick={() =>
                            onRead(notification.id)
                        }
                        className="
                            cursor-pointer
                            text-emerald-600
                            hover:text-emerald-700
                        "
                        aria-label="Mark as read"
                    >
                        <Check size={16} />
                    </button>
                )}

                <button
                    type="button"
                    onClick={() =>
                        onDelete(notification.id)
                    }
                    className="
                        cursor-pointer
                        text-red-600
                        hover:text-red-700
                    "
                    aria-label="Delete notification"
                >
                    <Trash2 size={16} />
                </button>

            </div>

        </div>
    );
}