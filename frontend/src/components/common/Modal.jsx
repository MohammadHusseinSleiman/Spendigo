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
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4

                dark:bg-black/70
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl

                    dark:border-slate-800
                    dark:bg-slate-900
                "
            >

                {/* Header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        px-6
                        py-4

                        dark:border-slate-800
                    "
                >

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-slate-900

                            dark:text-slate-100
                        "
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            cursor-pointer
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100

                            dark:text-slate-400
                            dark:hover:bg-slate-800
                        "
                        aria-label="Close modal"
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