import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Shared layout for all authenticated pages
export default function AppLayout({
    title,
    description,
    children,
}) {

    return (

        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Topbar
                    title={title}
                    description={description}
                />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>

    );
}