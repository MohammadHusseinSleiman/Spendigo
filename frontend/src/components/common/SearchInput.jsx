import { Search } from "lucide-react";

// Reusable search input component
export default function SearchInput({
    value = "",
    onChange,
    placeholder = "Search...",
    className = "",
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
                "
            />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
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
                    outline-none
                    transition
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-100
                "
            />

        </div>
    );
}