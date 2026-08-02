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
                bg-white
                p-5
                shadow-sm
                md:flex-row
            "
        >

            <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(event) =>
                    setSearch(
                        event.target.value
                    )
                }
                className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    outline-none
                    focus:border-emerald-500
                "
            />

            <select
                value={type}
                onChange={(event) =>
                    setType(
                        event.target.value
                    )
                }
                className="
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    outline-none
                    focus:border-emerald-500
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