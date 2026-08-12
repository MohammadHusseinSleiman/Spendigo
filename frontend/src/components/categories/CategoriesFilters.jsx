import { Search } from "lucide-react";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";

// Categories filters
export default function CategoriesFilters({
    search,
    setSearch,
    type,
    setType,
}) {

    const typeOptions = [
        {
            value: "all",
            label: "All Types",
        },
        {
            value: "expense",
            label: "Expenses",
        },
        {
            value: "income",
            label: "Income",
        },
    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-4
                xl:grid-cols-4
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                sm:p-5
            "
        >

            {/* Search */}
            <SearchInput
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
                placeholder="Search category..."
                className="md:col-span-2 xl:col-span-1"
            />

            {/* Type */}
            <Select
                value={type}
                onChange={(event) =>
                    setType(event.target.value)
                }
                options={typeOptions}
            />

        </div>
    );
}