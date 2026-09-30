import Card from "../Card";
import Skeleton from "./Skeleton";

function SkeletonStatCard() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="mt-3 h-8 w-32 rounded" />
            <Skeleton className="mt-4 h-3 w-20 rounded" />
        </div>
    );
}

function SkeletonBarChart() {
    return (
        <Card className="min-w-0">
            <Skeleton className="h-5 w-44 rounded" />

            <div className="mt-6 flex h-64 items-end justify-between gap-3 px-4 pb-4 sm:h-80 lg:h-[350px]">
                {[40, 70, 50, 85, 60, 75].map((height, index) => (
                    <Skeleton
                        key={index}
                        className="w-full rounded-t-lg"
                        style={{ height: `${height}%` }}
                    />
                ))}
            </div>
        </Card>
    );
}

function SkeletonPieChart() {
    return (
        <Card className="min-w-0">
            <Skeleton className="h-5 w-44 rounded" />

            <div className="flex h-64 items-center justify-center sm:h-80 lg:h-[350px]">
                <Skeleton className="h-48 w-48 rounded-full sm:h-56 sm:w-56" />
            </div>
        </Card>
    );
}

function SkeletonLineChart() {
    return (
        <Card className="min-w-0">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-36 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
            </div>

            <div className="mt-6 h-[240px] sm:h-[280px] lg:h-[320px]">
                <div className="flex h-full items-center">
                    <div className="flex w-full items-center gap-2">
                        {[45, 60, 35, 70, 50, 80, 60].map(
                            (height, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-full rounded-lg"
                                    style={{ height: `${height}%` }}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

function SkeletonExportCard() {
    return (
        <Card className="min-w-0">
            <Skeleton className="h-5 w-32 rounded" />

            <Skeleton className="mt-3 h-4 w-72 max-w-full rounded" />

            <div className="mt-6 flex flex-wrap gap-3">
                <Skeleton className="h-10 w-32 rounded-xl" />
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
        </Card>
    );
}

export default function ReportsSkeleton() {
    return (
        <div
            className="space-y-6"
            aria-busy="true"
            aria-label="Loading reports"
        >
            {/* Summary */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <SkeletonStatCard key={item} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <SkeletonBarChart />
                <SkeletonPieChart />
            </div>

            {/* Net Cash Flow */}
            <SkeletonLineChart />

            {/* Export */}
            <SkeletonExportCard />
        </div>
    );
}