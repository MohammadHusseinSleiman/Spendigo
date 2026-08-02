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

            <div className="mt-6 flex justify-end gap-3">

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
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-red-700
                        disabled:opacity-60
                    "
                >
                    {
                        loading
                            ? "Deleting..."
                            : "Delete"
                    }
                </button>

            </div>

        </Modal>

    );

}