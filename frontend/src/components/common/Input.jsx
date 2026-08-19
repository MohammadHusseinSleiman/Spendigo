export default function Input({

    label,
    type = "text",
    value,
    onChange,
    placeholder,
    name,
    error,
    autoComplete = "off",

}) {

    return (

        <div className="space-y-2">

            {label && (

                <label
                    htmlFor={name}
                    className="
                        block
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-300
                    "
                >
                    {label}
                </label>

            )}

            <input

                id={name}

                className={`
                    w-full
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-3
                    text-slate-900

                    placeholder:text-slate-400

                    transition-all
                    duration-200
                    outline-none

                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-slate-100
                    dark:placeholder:text-slate-500

                    ${
                        error
                            ? `
                                border-red-300
                                focus:border-red-500
                                focus:ring-2
                                focus:ring-red-100

                                dark:border-red-700
                                dark:focus:border-red-500
                                dark:focus:ring-red-950
                            `
                            : `
                                border-slate-200
                                hover:border-slate-300
                                focus:border-emerald-500
                                focus:ring-2
                                focus:ring-emerald-100

                                dark:border-slate-700
                                dark:hover:border-slate-600
                                dark:focus:border-emerald-500
                                dark:focus:ring-emerald-950
                            `
                    }
                `}

                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}

                aria-invalid={Boolean(error)}

                aria-describedby={
                    error
                        ? `${name}-error`
                        : undefined
                }

            />

            {error && (
                <p
                    id={`${name}-error`}
                    className="
                        text-sm
                        text-red-600
                        dark:text-red-400
                    "
                >
                    {error}
                </p>
            )}

        </div>

    );

}