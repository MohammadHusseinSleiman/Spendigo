import { Search } from "lucide-react";

// Transactions filters section
export default function TransactionFilters({
    search,
    setSearch,
    type,
    setType,
}) {

    return (

        <div
            className="
                rounded-2xl
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                "
            >

                {/* Search */}
                <div
                    className="
                        relative
                        flex-1
                    "
                >

                    <Search
                        size={18}
                        className="
                            absolute
                            left-3
                            top-3.5
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            py-3
                            pl-10
                            pr-4
                            outline-none
                            focus:border-emerald-500
                        "
                    />

                </div>

                {/* Type Filter */}
                <select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }
                    className="
                        rounded-xl
                        border
                        px-4
                        py-3
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

            </div>

        </div>
    );
}