import Card from "../common/Card";
import Toggle from "../common/Toggle";
import { useTheme } from "../../context/ThemeContext";

export default function PreferencesCard() {

    const {
        darkMode,
        toggleTheme,
        loading,
    } = useTheme();

    return (

        <Card className="mt-6">

            <h2
                className="
                    text-xl
                    font-semibold
                    text-slate-900
                    dark:text-white
                "
            >
                Application Preferences
            </h2>

            <p
                className="
                    mt-2
                    mb-6
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                "
            >
                Customize how Spendigo behaves and appears.
            </p>

            <div className="space-y-5">

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        border
                        border-slate-100
                        p-4

                        dark:border-slate-700
                        dark:bg-slate-800/50
                    "
                >

                    <div>

                        <p
                            className="
                                font-medium
                                text-slate-900
                                dark:text-white
                            "
                        >
                            Dark Mode
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            Use a darker interface throughout
                            the application.
                        </p>

                    </div>

                    <Toggle
                        checked={darkMode}
                        onChange={toggleTheme}
                        disabled={loading}
                    />

                </div>

            </div>

        </Card>

    );
}