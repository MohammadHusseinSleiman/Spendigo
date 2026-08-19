import { Search } from "lucide-react";

// Reusable search input component
export default function SearchInput({
    value = "",
    onChange,
    placeholder = "Search...",
    className = "",
    ariaLabel = "Search",
}) {
    return (
        <div className={`relative ${className}`}>

            <Search
                size={18}
                className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    dark:text-slate-500
                "
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-100
                    dark:placeholder:text-slate-500
                    dark:hover:border-slate-600
                    dark:focus:border-emerald-500
                    dark:focus:ring-emerald-900/40
                "
            />

        </div>
    );
}