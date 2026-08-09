import { Plus } from "lucide-react";

import SectionHeader from "../common/SectionHeader";

// Categories page header
export default function CategoriesHeader({ onAdd }) {

    return (

        <SectionHeader

            action={
                <button
                    type="button"
                    onClick={onAdd}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                        sm:w-auto
                    "
                >
                    <Plus size={18} />
                    Add Category
                </button>
            }

        />

    );
}