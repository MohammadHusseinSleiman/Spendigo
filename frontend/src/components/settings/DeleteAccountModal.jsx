import { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button"

export default function DeleteAccountModal({
    open,
    loading,
    onClose,
    onConfirm,
}) {

    const [password, setPassword] = useState("");

    function handleSubmit(e) {

        e.preventDefault();
        onConfirm(password);
        setPassword("");
    }

    return (

        <Modal
            isOpen={open}
            title="Delete Account"
            onClose={onClose}
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <p className="text-sm text-red-600">
                    This action is permanent and cannot be undone.
                </p>

                <input
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
                        onClick={onClose}
                        className="
                            w-full
                            rounded-xl
                            border
                            px-5
                            py-3
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
                            rounded-xl
                            bg-red-600
                            px-5
                            py-3
                            text-white
                            sm:w-auto
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