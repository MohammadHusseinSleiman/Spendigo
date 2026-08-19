import { Download, FileText } from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

// Export reports card component
export default function ExportReportsCard({
    onExportCSV,
    onExportPDF,
}) {
    return(
        <Card className="mt-6">

            <div className="mb-5">
                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                    dark:text-slate-100
                ">
                    Export Reports
                </h2>
                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                ">
                    Download your financial data for
                    record-keeping or accounting.
                </p>
            </div>

            <div className="
                flex
                flex-col
                gap-3
                sm:flex-row
            ">
                <Button
                    type="button"
                    onClick={onExportCSV}
                    className="
                        w-full
                        gap-2
                        font-medium
                        active:scale-[0.98]
                        sm:w-auto
                    "
                >
                    <Download size={18} />
                    Export CSV
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onExportPDF}
                    className="
                        w-full
                        gap-2
                        font-medium
                        active:scale-[0.98]
                        sm:w-auto
                    "
                >
                    <FileText size={18} />
                    Export PDF
                </Button>
            </div>

        </Card>
    );
}