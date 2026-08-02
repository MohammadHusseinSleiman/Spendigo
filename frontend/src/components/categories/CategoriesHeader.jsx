import { Plus } from "lucide-react";
import SectionHeader from "../common/SectionHeader";

// Categories page header
export default function CategoriesHeader({
    onAdd,
}) {

    return (

        <SectionHeader

            title="Categories"

            action={

                <button
                    onClick={onAdd}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-emerald-600
                        px-4
                        py-2.5
                        text-white
                        transition
                        hover:bg-emerald-700
                    "
                >
                    <Plus size={18} />
                    Add Category
                </button>

            }

        />

    );

}