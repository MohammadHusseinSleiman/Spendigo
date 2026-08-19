import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

// Change password form
export default function ChangePasswordForm({
    form,
    errors,
    loading,
    onChange,
    onSubmit,
}) {
    return (
        <Card className="mt-6">

            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Security
            </h2>

            <p className="mt-2 mb-6 text-sm text-slate-500 dark:text-slate-400">
                Update your password to keep your account secure.
            </p>

            <form
                onSubmit={onSubmit}
                className="space-y-5"
            >

                <Input
                    label="Current Password"
                    type="password"
                    name="current_password"
                    value={form.current_password ?? ""}
                    onChange={onChange}
                    error={errors.current_password}
                />

                <Input
                    label="New Password"
                    type="password"
                    name="new_password"
                    value={form.new_password ?? ""}
                    onChange={onChange}
                    error={errors.new_password}
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    value={form.confirm_password ?? ""}
                    onChange={onChange}
                    error={errors.confirm_password}
                />

                <div className="flex pt-1 sm:justify-end">

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading
                            ? "Updating..."
                            : "Change Password"}
                    </Button>

                </div>

            </form>

        </Card>
    );
}