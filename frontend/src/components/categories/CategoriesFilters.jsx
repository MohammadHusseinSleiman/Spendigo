import { Search } from "lucide-react";

// Categories filters
export default function CategoriesFilters({
    search,
    setSearch,
    type,
    setType,
}) {

    return (

        <div
            className="
                mb-6
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                sm:p-5
                sm:flex-row
            "
        >

            <div className="relative md:col-span-2 xl:col-span-1">
                <Search
                    size={18}
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />
                <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
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

            <select
                value={type}
                onChange={(event) =>
                    setType(event.target.value)
                }
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-emerald-500
                    sm:w-auto
                    sm:min-w-40
                    sm:py-2.5
                "
            >
                <option value="all">
                    All Types
                </option>
                <option value="income">
                    Income
                </option>
                <option value="expense">
                    Expense
                </option>
            </select>

        </div>
    );
}