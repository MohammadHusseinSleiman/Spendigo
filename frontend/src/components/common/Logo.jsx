export default function Logo({ size = "default" }) {
    const sizeClasses = {
        default: "w-44",
        small: "w-36",
        large: "w-52",
    };

    return (
        <div className="select-none">
            {/* Light mode logo */}
            <img
                src="/brand/spendigo-horizontal.svg"
                alt="Spendigo"
                className={`
                    ${sizeClasses[size] ?? sizeClasses.default}
                    h-auto
                    dark:hidden
                `}
            />

            {/* Dark mode logo */}
            <img
                src="/brand/spendigo-horizontal-dark.svg"
                alt="Spendigo"
                className={`
                    ${sizeClasses[size] ?? sizeClasses.default}
                    hidden
                    h-auto
                    dark:block
                `}
            />
        </div>
    );
}