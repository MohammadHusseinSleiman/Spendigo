import Skeleton from "./Skeleton";

export default function ProtectedRouteSkeleton() {
    return (
        <div
            className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
            aria-busy="true"
            aria-label="Loading application"
        >
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
                <div className="p-6">
                    <Skeleton className="h-8 w-32 rounded" />
                </div>

                <div className="space-y-3 px-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Skeleton
                            key={item}
                            className="h-11 w-full rounded-xl"
                        />
                    ))}
                </div>
            </aside>

            {/* Main area */}
            <div className="lg:ml-64">
                {/* Topbar */}
                <header className="fixed inset-x-0 top-0 z-30 h-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:left-64">
                    <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-28 rounded" />
                            <Skeleton className="h-3 w-48 rounded" />
                        </div>

                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </header>

                {/* Content */}
                <main className="min-w-0 flex-1 p-4 pt-24 sm:p-6 sm:pt-24 lg:p-8 lg:pt-24">
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-40 rounded" />

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <Skeleton className="h-4 w-24 rounded" />
                                    <Skeleton className="mt-4 h-8 w-32 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="h-80 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                                <Skeleton className="h-5 w-40 rounded" />
                                <Skeleton className="mt-6 h-56 w-full rounded-xl" />
                            </div>

                            <div className="h-80 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                                <Skeleton className="h-5 w-40 rounded" />
                                <Skeleton className="mt-6 h-56 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}