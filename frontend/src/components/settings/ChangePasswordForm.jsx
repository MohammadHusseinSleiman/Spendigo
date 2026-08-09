import Card from "../common/Card";
import Button from "../common/Button";

// Change password form
export default function ChangePasswordForm({
    form,
    errors,
    loading,
    onChange,
    onSubmit,
}) {

    return (

        <Card className="mt-8">

            <h2 className="mb-2 text-xl font-semibold text-slate-900">
                Security
            </h2>

            <form
                onSubmit={onSubmit}
                className="space-y-5 mt-8"
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

                <div className="flex pt-1 sm:justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {
                            loading
                                ? "Updating..."
                                : "Change Password"
                        }
                    </Button>

                </div>

            </form>

        </Card>

    );
}