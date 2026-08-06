export default function PreferencesCard({
    loading,
    onClick,
    preferences,
    setPreferences
}) {
    return (
        <div
            className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
            "
        >

            <h2 className="mb-6 text-xl font-semibold">
                Application Preferences
            </h2>

            <div className="space-y-5">

                {/* Currency */}
                <div>

                    <label className="mb-2 block text-sm font-medium">
                        Currency
                    </label>

                    <select
                        value={preferences.currency}
                        onChange={(event) =>
                            setPreferences({
                                ...preferences,
                                currency: event.target.value,
                            })
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                        "
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="LBP">LBP</option>
                        <option value="SAR">SAR</option>
                        <option value="AED">AED</option>
                    </select>

                </div>

                {/* Dark mode */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <span className="font-medium">
                        Dark Mode
                    </span>
                    <input
                        type="checkbox"
                        className="
                            h-5
                            w-5
                            accent-emerald-600
                        "
                        checked={preferences.dark_mode}
                        onChange={(event) =>
                            setPreferences({
                                ...preferences,
                                dark_mode: event.target.checked,
                            })
                        }
                    />
                </div>

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
                        disabled:opacity-60
                    "
                >
                    {
                        loading
                            ? "Saving..."
                            : "Save Preferences"
                    }
                </button>

            </div>

        </div>
    );
}