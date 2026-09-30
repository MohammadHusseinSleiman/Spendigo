import Card from "../Card";
import Skeleton from "./Skeleton";

function SkeletonFilters() {
    return (
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2">
            <Skeleton className="h-11 rounded-lg" />
            <Skeleton className="h-11 rounded-lg" />
        </div>
    );
}

function SkeletonTable() {
    return (
        <Card className="mt-6 min-w-0 overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <th
                                    key={item}
                                    className="px-4 py-4 text-left"
                                >
                                    <Skeleton className="h-3 w-16 rounded" />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4, 5, 6].map((row) => (
                            <tr
                                key={row}
                                className="border-b border-slate-100 last:border-0 dark:border-slate-800/70"
                            >
                                <td className="px-4 py-5">
                                    <Skeleton className="h-4 w-32 rounded" />
                                </td>

                                <td className="px-4 py-5">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </td>

                                <td className="px-4 py-5">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-7 w-7 rounded-full" />
                                        <Skeleton className="h-4 w-16 rounded" />
                                    </div>
                                </td>

                                <td className="px-4 py-5">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </td>

                                <td className="px-4 py-5">
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default function CategoriesSkeleton() {
    return (
        <div
            className="space-y-6"
            aria-busy="true"
            aria-label="Loading categories"
        >
            {/* Header action */}
            <div className="flex justify-end">
                <Skeleton className="h-11 w-36 rounded-xl" />
            </div>

            {/* Filters */}
            <SkeletonFilters />

            {/* Categories table */}
            <SkeletonTable />
        </div>
    );
}