import AppLayout from "../layout/AppLayout";

// Reusable loading indicator
export default function LoadingSpinner() {
    return (
        <AppLayout
            description="Loading..."
        >
            <div className="flex justify-center pt-50">
                <div
                    className="
                        h-8
                        w-8
                        animate-spin
                        rounded-full
                        border-4
                        border-emerald-600
                        border-t-transparent
                    "
                />
            </div>
        </AppLayout>
    );
}