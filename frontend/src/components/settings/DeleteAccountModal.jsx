import { useState } from "react";

import Modal from "../common/Modal";

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

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            px-5
                            py-3
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            rounded-xl
                            bg-red-600
                            px-5
                            py-3
                            text-white
                        "
                    >
                        {
                            loading
                                ? "Deleting..."
                                : "Delete Account"
                        }
                    </button>

                </div>

            </form>

        </Modal>
    );
}