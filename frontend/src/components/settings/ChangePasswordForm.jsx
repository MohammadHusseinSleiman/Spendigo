// Change password form
export default function ChangePasswordForm({
    form,
    errors,
    loading,
    onChange,
    onSubmit,
}) {

    return (

        <form
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Current password */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Current Password
                </label>

                <input
                    type="password"
                    name="current_password"
                    value={form.current_password}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                    "
                />
                {
                    errors.current_password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.current_password}
                        </p>
                    )
                }

            </div>

            {/* New password */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    New Password
                </label>

                <input
                    type="password"
                    name="new_password"
                    value={form.new_password}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                    "
                />
                {
                    errors.new_password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.new_password}
                        </p>
                    )
                }

            </div>

            {/* Confirm password */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-3
                        outline-none
                        focus:border-emerald-500
                    "
                />
                {
                    errors.confirm_password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirm_password}
                        </p>
                    )
                }

            </div>

            <div className="flex justify-end">

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        rounded-xl
                        bg-emerald-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                        disabled:opacity-60
                    "
                >
                    {
                        loading
                            ? "Updating..."
                            : "Change Password"
                    }
                </button>

            </div>

        </form>

    );
}