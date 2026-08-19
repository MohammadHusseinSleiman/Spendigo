import { Plus } from "lucide-react";

import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";

// Categories page header
export default function CategoriesHeader({ onAdd }) {

    return (

        <SectionHeader

            action={
                <Button
                    type="button"
                    onClick={onAdd}
                    className="
                        w-full
                        gap-2
                        text-sm
                        sm:w-auto
                    "
                >
                    <Plus size={18} />
                    Add Category
                </Button>
            }

        />

    );
}