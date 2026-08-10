import Button from "../common/Button";
import Modal from "../common/Modal";

// Delete confirmation modal
export default function DeleteTransactionModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) {

    return (

        <Modal
            isOpen={isOpen}
            title="Delete Transaction"
            onClose={onClose}
        >

            <p className="text-slate-600">
                Are you sure you want to delete this transaction?
            </p>

            <p className="mt-2 text-sm text-red-600">
                This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    className="
                        w-full
                        cursor-pointer
                        sm:w-auto
                    "
                >
                    Cancel
                </Button>

                <Button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="
                        w-full
                        cursor-pointer
                        bg-red-600
                        font-medium
                        text-white
                        transition
                        hover:bg-red-700
                        disabled:opacity-60
                        sm:w-auto
                    "
                >
                    {loading
                        ? "Deleting..."
                        : "Delete"}
                </Button>

            </div>

        </Modal>
    );
}