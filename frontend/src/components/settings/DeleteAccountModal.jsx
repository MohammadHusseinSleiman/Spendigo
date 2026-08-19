import { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button"
import Input from "../common/Input";

export default function DeleteAccountModal({
    open,
    loading,
    onClose,
    onConfirm,
}) {

    const [password, setPassword] = useState("");

    function handleSubmit(e) {

        e.preventDefault();
        if (!password.trim()) {
            return;
        }
        onConfirm(password);
    }

    function handleClose() {
        setPassword("");
        onClose();
    }

    return (

        <Modal
            isOpen={open}
            title="Delete Account"
            onClose={handleClose}
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <p className="text-sm text-red-600">
                    This action is permanent and cannot be undone.
                </p>

                <Input
                    type="password"
                    placeholder="Current password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        px-4
                        py-3
                    "
                />

                <div
                    className="
                        flex
                        flex-col-reverse
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    "
                >

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        className="
                            w-full
                            border
                            sm:w-auto
                        "
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
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
                        {
                            loading
                                ? "Deleting..."
                                : "Delete Account"
                        }
                    </Button>

                </div>

            </form>

        </Modal>
    );
}