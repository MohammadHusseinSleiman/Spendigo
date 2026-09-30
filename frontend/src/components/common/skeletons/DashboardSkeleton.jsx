import Card from "../Card";
import Skeleton from "./Skeleton";

function SkeletonStatCard() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-8 w-36 rounded" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl" />
            </div>

            <Skeleton className="mt-4 h-3 w-24 rounded" />
        </div>
    );
}

function SkeletonChartCard({ type = "bars" }) {
    return (
        <Card className="min-w-0">
            <Skeleton className="h-5 w-48 rounded" />

            <div className="mt-6 h-64 sm:h-80 lg:h-[350px]">
                {type === "pie" ? (
                    <div className="flex h-full items-center justify-center">
                        <Skeleton className="h-48 w-48 rounded-full sm:h-56 sm:w-56" />
                    </div>
                ) : (
                    <div className="flex h-full items-end justify-between gap-3 px-4 pb-4">
                        {[45, 65, 35, 80, 55, 70].map((height, index) => (
                            <Skeleton
                                key={index}
                                className="w-full rounded-t-lg"
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

function SkeletonRecentTransactions() {
    return (
        <Card className="min-w-0">
            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
            </div>

            <div className="mt-6 space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

                            <div className="min-w-0 space-y-2">
                                <Skeleton className="h-4 w-32 rounded" />
                                <Skeleton className="h-3 w-20 rounded" />
                            </div>
                        </div>

                        <div className="shrink-0 space-y-2">
                            <Skeleton className="ml-auto h-4 w-20 rounded" />
                            <Skeleton className="ml-auto h-3 w-16 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function SkeletonQuickActions() {
    return (
        <Card className="min-w-0">
            <Skeleton className="h-5 w-32 rounded" />

            <div className="mt-6 space-y-3">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                    >
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <Skeleton className="h-4 w-28 rounded" />
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default function DashboardSkeleton() {
    return (
        <div
            className="space-y-6"
            aria-busy="true"
            aria-label="Loading dashboard"
        >
            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <SkeletonStatCard key={item} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <SkeletonChartCard type="bars" />
                <SkeletonChartCard type="pie" />
            </div>

            {/* Recent Transactions + Quick Actions */}
            <div className="grid min-w-0 gap-6 lg:grid-cols-3">
                <div className="min-w-0 lg:col-span-2">
                    <SkeletonRecentTransactions />
                </div>

                <div className="min-w-0">
                    <SkeletonQuickActions />
                </div>
            </div>
        </div>
    );
}