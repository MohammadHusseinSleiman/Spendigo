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
                        w-full
                        gap-2
                        text-sm
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