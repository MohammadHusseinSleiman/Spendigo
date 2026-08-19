import SearchInput from "../common/SearchInput";
import Select from "../common/Select";

import { TYPE_FILTER_OPTIONS } from "../../constants/typeFilterOptions";
import { mapCategoriesToOptions } from "../../utils/selectOptions";

// Transactions filters section
export default function TransactionFilters({
    search,
    setSearch,
    type,
    setType,
    categoryId,
    categories,
    setCategoryId,
    month,
    setMonth,
}) {

    const categoryOptions = mapCategoriesToOptions(categories);

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                mb-6

                dark:border-slate-700
                dark:bg-slate-900

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
                <SearchInput
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search transactions..."
                    className="md:col-span-2 xl:col-span-1"
                />

                {/* Type */}
                <Select
                    value={type}
                    onChange={(event) =>
                        setType(event.target.value)
                    }
                    options={TYPE_FILTER_OPTIONS}
                />

                {/* Category */}
                <Select
                    value={categoryId}
                    onChange={(event) =>
                        setCategoryId(event.target.value)
                    }
                    placeholder="All Categories"
                    options={categoryOptions}
                />

                {/* Month */}
                <input
                    type="month"
                    value={month}
                    onChange={(event) =>
                        setMonth(event.target.value)
                    }
                    aria-label="Filter by month"
                    className="
                        cursor-pointer
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-slate-700
                        outline-none
                        transition

                        hover:border-slate-300

                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100

                        dark:border-slate-700
                        dark:bg-slate-950
                        dark:text-slate-100
                        dark:hover:border-slate-600
                        dark:focus:border-emerald-500
                        dark:focus:ring-emerald-900/40
                    "
                />

            </div>

        </div>
    );
}