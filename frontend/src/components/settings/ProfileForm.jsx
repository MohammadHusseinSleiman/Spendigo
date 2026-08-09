import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

// Profile information form
export default function ProfileForm({
    profile,
    errors,
    loading,
    onChange,
    onSubmit,
    photoUrl,
    onPhotoChange,
}) {

    return (

        <Card>

            <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Profile Information
            </h2>

            {/* Profile photo */}
            <div 
                className="
                    mb-6
                    flex
                    flex-col
                    items-center
                    gap-4
                    sm:flex-row
                    sm:gap-5
                "
            >

                <img
                    src={photoUrl}
                    alt="Profile"
                    className="
                        h-24
                        w-24
                        rounded-full
                        border
                        border-slate-200
                        object-cover
                    "
                />

                <div>

                    <label
                        className="
                            inline-flex
                            cursor-pointer
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-50
                        "
                    >
                        Change Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onPhotoChange}
                            className="hidden"
                        />
                    </label>

                    <p className="mt-2 text-xs text-slate-400">
                        JPG, PNG or WebP.
                    </p>

                </div>

            </div>

            <form
                onSubmit={onSubmit}
                className="space-y-5"
            >

                <Input
                    label="Full Name"
                    name="full_name"
                    value={profile.full_name ?? ""}
                    onChange={onChange}
                    error={errors.full_name}
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email ?? ""}
                    onChange={onChange}
                    error={errors.email}
                />

                <div>

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Bio
                    </label>

                    <textarea
                        name="bio"
                        value={profile.bio ?? ""}
                        onChange={onChange}
                        rows={4}
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-100
                        "
                    />

                    {errors.bio && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.bio}
                        </p>
                    )}

                </div>

                <div>

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Currency
                    </label>

                    <select
                        name="currency"
                        value={profile.currency ?? "USD"}
                        onChange={onChange}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-100
                        "
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="LBP">LBP</option>
                        <option value="SAR">SAR</option>
                        <option value="AED">AED</option>
                    </select>

                    {errors.currency && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.currency}
                        </p>
                    )}

                </div>

                <div className="flex pt-2 sm:justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>
                </div>

            </form>

        </Card>
    );
}