export default function NotificationItem({ notification }) {

    return (

        <div
            className="
                border-b
                border-slate-100
                px-4
                py-3
                last:border-none
                hover:bg-slate-50
                transition
            "
        >

            <p className="text-sm font-medium">
                {notification.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {notification.time}
            </p>

        </div>

    );

}