import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import Logo from "../common/Logo";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import {
    applyTheme,
    getStoredTheme,
} from "../../utils/theme";

export default function AuthCard() {

    const [mode, setMode] = useState("signin");
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isSignIn = mode === "signin";

    useEffect(() => {

        const storedTheme = getStoredTheme();

        setIsDarkMode(storedTheme);
        applyTheme(storedTheme);

    }, []);

    function handleThemeToggle() {

        const nextMode = !isDarkMode;

        setIsDarkMode(nextMode);
        applyTheme(nextMode);
    }

    return (

        <div
            className="
                relative
                w-full
                max-w-md
                rounded-3xl
                border
                border-slate-200
                bg-white/90
                p-8
                shadow-xl
                backdrop-blur-xl

                dark:border-slate-700
                dark:bg-slate-900/90
                dark:shadow-black/30
            "
        >

            {/* Theme toggle */}
            <button
                type="button"
                onClick={handleThemeToggle}
                aria-label={
                    isDarkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
                className="
                    absolute
                    right-5
                    top-5
                    inline-flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition

                    hover:bg-slate-100
                    hover:text-slate-900

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-300
                    dark:hover:bg-slate-700
                    dark:hover:text-white
                "
            >
                {isDarkMode ? (
                    <Sun size={18} />
                ) : (
                    <Moon size={18} />
                )}
            </button>

            {/* Header */}
            <div
                className="
                    mb-8
                    pt-2
                    text-center
                "
            >

                <Logo />

                <p
                    className="
                        mt-2
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Track your finances with confidence.
                </p>

            </div>

            {/* Sign In / Sign Up switch */}
            <div
                className="
                    mb-8
                    flex
                    rounded-xl
                    bg-slate-100
                    p-1
                    dark:bg-slate-800
                "
            >

                <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`
                        flex-1
                        cursor-pointer
                        rounded-lg
                        py-2
                        text-sm
                        font-semibold
                        transition

                        ${
                            isSignIn
                                ? `
                                    bg-white
                                    text-emerald-600
                                    shadow
                                    dark:bg-slate-700
                                    dark:text-emerald-400
                                `
                                : `
                                    text-slate-500
                                    dark:text-slate-400
                                `
                        }
                    `}
                >
                    Sign In
                </button>

                <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`
                        flex-1
                        cursor-pointer
                        rounded-lg
                        py-2
                        text-sm
                        font-semibold
                        transition

                        ${
                            !isSignIn
                                ? `
                                    bg-white
                                    text-emerald-600
                                    shadow
                                    dark:bg-slate-700
                                    dark:text-emerald-400
                                `
                                : `
                                    text-slate-500
                                    dark:text-slate-400
                                `
                        }
                    `}
                >
                    Sign Up
                </button>

            </div>

            {isSignIn ? (
                <SignInForm
                    email={registeredEmail}
                />
            ) : (
                <SignUpForm
                    onSuccess={(email) => {
                        setRegisteredEmail(email);
                        setMode("signin");
                    }}
                />
            )}

        </div>
    );
}