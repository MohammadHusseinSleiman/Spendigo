import { X } from "lucide-react";

// Reusable modal component
export default function Modal({
    isOpen,
    title,
    children,
    onClose,
}) {

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50
                p-4
            "
        >
            <div
                className="
                    w-full
                    max-w-lg
                    rounded-2xl
                    bg-white
                    shadow-xl
                "
            >

                {/* Header */}
                <div
                    className="
                        flex items-center justify-between
                        border-b
                        px-6 py-4
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-slate-100
                        "
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}
                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}