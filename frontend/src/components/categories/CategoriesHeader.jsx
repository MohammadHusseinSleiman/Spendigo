import { Plus } from "lucide-react";

import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";

// Categories page header
export default function CategoriesHeader({ onAdd }) {

    return (

        <SectionHeader

            title="Categories"

            action={
                <Button
                    type="button"
                    onClick={onAdd}
                >
                    <span className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Category
                    </span>
                </Button>
            }

        />

    );
}