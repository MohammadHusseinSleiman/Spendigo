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

            <div>

                <p className="font-medium text-slate-900">
                    {user?.full_name}
                </p>

                <p className="text-sm text-slate-500">
                    {user?.email}
                </p>

            </div>

        </div>
    );
}