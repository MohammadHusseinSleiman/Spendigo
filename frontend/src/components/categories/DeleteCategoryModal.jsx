import Button from "../common/Button";
import Modal from "../common/Modal";

// Delete category modal
export default function DeleteCategoryModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) {

    return (

        <Modal
            isOpen={isOpen}
            title="Delete Category"
            onClose={onClose}
        >

            <p className="text-slate-600">
                Are you sure you want to delete this category?
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
                        bg-red-600
                        font-medium
                        text-white
                        hover:bg-red-700
                        disabled:opacity-60
                        sm:w-auto

                        dark:bg-red-600
                        dark:text-white
                        dark:hover:bg-red-700
                    "
                >
                    {
                        loading
                            ? "Deleting..."
                            : "Delete"
                    }
                </Button>

            </div>

        </Modal>

    );

}