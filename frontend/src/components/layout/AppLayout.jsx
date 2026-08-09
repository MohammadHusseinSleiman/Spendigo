import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Shared responsive layout for authenticated pages
export default function AppLayout({
    title,
    description,
    children,
}) {

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (

        <div
            className="
                min-h-screen
                bg-slate-50
            "
        >

            <Sidebar
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
            />

            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    lg:ml-64
                "
            >

                <Topbar
                    title={title}
                    description={description}
                    onMenuClick={() =>
                        setMobileSidebarOpen(true)
                    }
                />

                <main
                    className="
                        min-w-0
                        flex-1
                        p-4
                        pt-24
                        sm:p-6
                        sm:pt-24
                        lg:p-8
                        lg:pt-24
                    "
                >
                    {children}
                </main>

            </div>

        </div>

    );
}