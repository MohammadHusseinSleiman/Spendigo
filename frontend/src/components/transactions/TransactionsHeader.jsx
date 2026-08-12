import { Plus } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Button from "../common/Button";

// Transactions page header
export default function TransactionsHeader({
    onAdd,
}) {

    return (

        <SectionHeader

            action={
                <Button
                    type="button"
                    onClick={onAdd}
                    className="
                        cursor-pointer
                        flex
                        w-full
                        gap-2
                        bg-emerald-600
                        text-sm
                        font-medium
                        text-white
                        hover:bg-emerald-700
                        sm:w-auto
                    "
                >
                    <Plus size={18} />
                    Add Transaction
                </Button>
            }

        />

    );
}