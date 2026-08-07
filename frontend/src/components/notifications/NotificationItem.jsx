import { Check, Trash2, } from "lucide-react";

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
                last:border-none
                hover:bg-slate-50
                transition
            "
        >

            <div className="flex-1">

                <p
                    className={
                        notification.read
                            ? "text-sm text-slate-500"
                            : "text-sm font-semibold"
                    }
                >
                    {notification.message}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {
                        new Date(
                            notification.created_at
                        ).toLocaleString()
                    }
                </p>

            </div>

            <div className="ml-3 flex gap-2">

                {
                    !notification.read && (
                        <button
                            type="button"
                            onClick={() =>
                                onRead(notification.id)
                            }
                            className="
                                text-emerald-600
                                hover:text-emerald-700
                            "
                        >
                            <Check size={16} />
                        </button>
                    )
                }

                <button
                    type="button"
                    onClick={() =>
                        onDelete(notification.id)
                    }
                    className="
                        text-red-600
                        hover:text-red-700
                    "
                >
                    <Trash2 size={16} />
                </button>

            </div>

        </div>

    );

}