import { useAuth } from "../../context/AuthContext";

// Displays authenticated user information
export default function UserMenu() {
    const { user } = useAuth();

    return (
        <div className="flex items-center gap-3">

            <div
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-600
                    font-semibold
                    text-white
                "
            >
                {user?.full_name?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden min-w-0 sm:block">

                <p className="max-w-50 truncate font-medium text-slate-900">
                    {user?.full_name}
                </p>

                <p className="max-w-40 truncate text-sm text-slate-500">
                    {user?.email}
                </p>

            </div>

        </div>
    );
}