import Card from "../common/Card";
import Toggle from "../common/Toggle";

export default function PreferencesCard({
    loading,
    onClick,
    preferences,
    setPreferences,
}) {

    return (

        <Card className="mt-8">

            <h2 className="mb-2 text-xl font-semibold text-slate-900">
                Application Preferences
            </h2>

            <p className="mb-6 text-sm text-slate-500">
                Customize how Spendigo behaves and appears.
            </p>

            <div className="space-y-5">

                {/* Dark mode */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-slate-100
                        p-4
                    "
                >

                    <div>
                        <p className="font-medium text-slate-900">
                            Dark Mode
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Use a darker interface throughout the application.
                        </p>
                    </div>

                    <Toggle
                        checked={preferences.dark_mode}
                        onChange={(value) =>
                            setPreferences(previous => ({
                                ...previous,
                                dark_mode: value,
                            }))
                        }
                    />

                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={onClick}
                        disabled={loading}
                        className="
                            rounded-xl
                            bg-emerald-600
                            px-5
                            py-3
                            font-medium
                            text-white
                            transition
                            hover:bg-emerald-700
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? "Saving..."
                            : "Save Preferences"}
                    </button>
                </div>

            </div>

        </Card>
    );
}