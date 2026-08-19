import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";
import Select from "../common/Select";

import { CURRENCY_OPTIONS } from "../../constants/currencyOptions";

// Profile information form
export default function ProfileForm({
    profile,
    errors,
    loading,
    disabled,
    onChange,
    onSubmit,
    photoUrl,
    onPhotoChange,
}) {
    return (
        <>
            {/* Profile photo */}
            <Card>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Profile Photo
                </h2>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6">

                    <img
                        src={photoUrl}
                        alt="Profile"
                        className="
                            h-28
                            w-28
                            rounded-full
                            border
                            border-slate-200
                            shadow-md
                            object-cover
                            dark:border-slate-700
                        "
                    />

                    <div className="mt-4 sm:mt-0 flex flex-col">

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

                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-slate-200
                                dark:hover:bg-slate-700
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

                        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                            JPG, PNG or WebP.
                        </p>

                    </div>
                </div>
            </Card>

            {/* Profile information */}
            <Card className="mt-6">

                <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Profile Information
                </h2>

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

                    {/* Bio */}
                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                dark:text-slate-300
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
                                bg-white
                                px-4
                                py-3
                                text-sm
                                text-slate-900
                                outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-emerald-500
                                focus:ring-2
                                focus:ring-emerald-100

                                dark:border-slate-700
                                dark:bg-slate-950
                                dark:text-slate-100
                                dark:placeholder:text-slate-500
                                dark:focus:border-emerald-500
                                dark:focus:ring-emerald-900/40
                            "
                            placeholder="Tell us a little about yourself..."
                        />

                        {errors.bio && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.bio}
                            </p>
                        )}

                    </div>

                    {/* Currency */}
                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                dark:text-slate-300
                            "
                        >
                            Currency
                        </label>

                        <Select
                            name="currency"
                            value={profile.currency ?? "USD"}
                            onChange={onChange}
                            options={CURRENCY_OPTIONS}
                            className="min-h-[50px]"
                        />

                        {errors.currency && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {errors.currency}
                            </p>
                        )}

                    </div>

                    <div className="flex pt-2 sm:justify-end">

                        <Button
                            type="submit"
                            disabled={loading || disabled}
                            className="w-full sm:w-auto cursor-pointer"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>

                    </div>

                </form>

            </Card>
        </>
    );
}