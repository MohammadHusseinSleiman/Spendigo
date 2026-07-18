import PageTitle from "../common/PageTitle";
import UserMenu from "./UserMenu";

// Top navigation bar
export default function Topbar({
    title,
    description,
}) {

    return (

        <header
            className="
                flex
                h-16
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                px-8
            "
        >

            <PageTitle
                title={title}
                description={description}
            />

            <UserMenu />

        </header>

    );

}