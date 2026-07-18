import { useState } from "react";

import Logo from "../common/Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthCard() {
    const [mode, setMode] = useState("signin");
    const [registeredEmail, setRegisteredEmail] = useState("");
    const isSignIn = mode === "signin";

    return (
        <div
            className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-slate-200
                bg-white/90
                backdrop-blur-xl
                p-8
                shadow-xl
            "
        >
            <div className="mb-8 text-center">
                <Logo />

                <p className="mt-2 text-sm text-gray-500">
                    Track your finances with confidence.
                </p>
            </div>

            <div className="mb-8 flex rounded-xl bg-gray-100 p-1">
                <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`
                        flex-1
                        rounded-lg
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${
                            isSignIn
                                ? "bg-white text-emerald-600 shadow"
                                : "text-gray-500"
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
                        rounded-lg
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${
                            !isSignIn
                                ? "bg-white text-emerald-600 shadow"
                                : "text-gray-500"
                        }
                    `}
                >
                    Sign Up
                </button>
            </div>

            {
                isSignIn ? 
                    <SignInForm
                        email={registeredEmail}
                    /> :
                    <SignUpForm
                        onSuccess={(email) => {
                            setRegisteredEmail(email);
                            setMode("signin");
                        }}
                    />
}
        </div>
    );
}