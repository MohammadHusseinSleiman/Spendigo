import { Search } from "lucide-react";

// Transactions filters section
export default function TransactionFilters({
    search,
    setSearch,
    type,
    setType,
    categoryId,
    setCategoryId,
    categories,
    month,
    setMonth,
}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                sm:p-5
            "
        >

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >

                {/* Search */}
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
                        placeholder="Search transactions..."
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

                {/* Type */}
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
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100
                    "
                >
                    <option value="all">
                        All Types
                    </option>
                    <option value="expense">
                        Expenses
                    </option>
                    <option value="income">
                        Income
                    </option>
                </select>

                {/* Category */}
                <select
                    value={categoryId}
                    onChange={(event) =>
                        setCategoryId(event.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100
                    "
                >
                    <option value="">
                        All Categories
                    </option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Month */}
                <input
                    type="month"
                    value={month}
                    onChange={(event) =>
                        setMonth(event.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100
                    "
                />

            </div>

        </div>

    );
}