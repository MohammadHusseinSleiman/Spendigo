export default function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    name,
    autoComplete="off"
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-slate-900
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    outline-none
                    focus:border-emerald-600
                    focus:ring-4
                    focus:ring-emerald-100
                "
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}