import Card from "../common/Card";
import Button from "../common/Button";
import { useState } from "react";

// Delete Account Card
export default function DeleteAccountCard({
    onClick
}) {
    return (
        <Card className="mt-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Danger Zone
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Permanently delete your account and all
                associated data.
            </p>
            <div className="mt-5 flex justify-end">
                <Button
                    type="button"
                    onClick={onClick}
                    className="
                        w-full
                        bg-red-600
                        text-white
                        hover:bg-red-700
                        sm:w-auto

                        dark:bg-red-600
                        dark:text-white
                        dark:hover:bg-red-700
                    "
                >
                    Delete Account
                </Button>
            </div>
        </Card>
    );
}