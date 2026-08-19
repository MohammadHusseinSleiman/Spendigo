import AuthCard from "../components/auth/AuthCard";

export default function Started() {
    return (
        <main
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-50
                p-6

                dark:bg-slate-950
            "
        >
            <AuthCard />
        </main>
    );
}