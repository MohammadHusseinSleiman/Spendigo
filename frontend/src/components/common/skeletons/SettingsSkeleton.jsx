import Card from "../Card";
import Skeleton from "./Skeleton";

function ProfilePhotoSkeleton() {
    return (
        <Card>
            <Skeleton className="h-6 w-32 rounded" />

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <Skeleton className="h-28 w-28 shrink-0 rounded-full" />

                <div className="mt-4 space-y-2 sm:mt-0">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-3 w-28 rounded" />
                </div>
            </div>
        </Card>
    );
}

function ProfileInformationSkeleton() {
    return (
        <Card className="mt-6">
            <Skeleton className="mb-6 h-6 w-40 rounded" />

            <div className="space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-10 rounded" />
                    <Skeleton className="h-28 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="flex pt-2 sm:justify-end">
                    <Skeleton className="h-11 w-full rounded-xl sm:w-32" />
                </div>
            </div>
        </Card>
    );
}

function SecuritySkeleton() {
    return (
        <Card className="mt-6">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

            <div className="mt-6 space-y-5">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="space-y-2">
                        <Skeleton className="h-4 w-32 rounded" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                ))}

                <div className="flex pt-1 sm:justify-end">
                    <Skeleton className="h-11 w-full rounded-xl sm:w-40" />
                </div>
            </div>
        </Card>
    );
}

function PreferencesSkeleton() {
    return (
        <Card className="mt-6">
            <Skeleton className="h-6 w-52 rounded" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

            <div className="mt-6">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <div className="min-w-0 space-y-2">
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-3 w-72 max-w-full rounded" />
                    </div>

                    <Skeleton className="h-6 w-11 shrink-0 rounded-full" />
                </div>
            </div>
        </Card>
    );
}

function DangerZoneSkeleton() {
    return (
        <Card className="mt-6">
            <Skeleton className="h-6 w-28 rounded" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full rounded" />

            <div className="mt-5 flex sm:justify-end">
                <Skeleton className="h-11 w-full rounded-xl sm:w-36" />
            </div>
        </Card>
    );
}

export default function SettingsSkeleton() {
    return (
        <div
            className="space-y-6"
            aria-busy="true"
            aria-label="Loading settings"
        >
            <ProfilePhotoSkeleton />
            <ProfileInformationSkeleton />
            <SecuritySkeleton />
            <PreferencesSkeleton />
            <DangerZoneSkeleton />
        </div>
    );
}