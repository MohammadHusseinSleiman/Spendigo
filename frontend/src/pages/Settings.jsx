import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";

export default function Settings() {

    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        bio: "",
        currency: "USD",
        photo: null,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            const data = await settingsService.getProfile();
            setProfile(data);

        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {

        const {
            name,
            value,
        } = event.target;

        setProfile(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();
        setSaving(true);
        setErrors({});

        try {

            await settingsService.updateProfile( profile );
            await loadProfile();

        } catch (error) {

            if ( error.response?.status === 422 ) {

                setErrors( error.response.data.errors );

            } else {
                console.error(error);
            }

        } finally {
            setSaving(false);
        }
    }

    function handlePasswordChange(event) {

        const {
            name,
            value,
        } = event.target;

        setPasswordForm(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handlePasswordSubmit(event) {

        event.preventDefault();
        setPasswordLoading(true);
        setPasswordErrors({});

        try {

            await settingsService.changePassword( passwordForm );
            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
            alert("Password changed successfully.");

        } catch (error) {

            if (error.response?.status === 422) {

                setPasswordErrors(
                    error.response.data.errors
                );

            } else {

                console.error(error);
                alert(
                    error.response?.data?.message ??
                    "Unable to change password."
                );
            }

        } finally {
            setPasswordLoading(false);
        }
    }

    return (

        <AppLayout
            title="Settings"
            description="Manage your account preferences"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <input
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleChange}
                />
                {
                    errors.full_name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.full_name}
                        </p>
                    )
                }

                <input
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                />
                {
                    errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )
                }

                <textarea
                    name="bio"
                    value={profile.bio ?? ""}
                    onChange={handleChange}
                />

                <select
                    name="currency"
                    value={profile.currency}
                    onChange={handleChange}
                >
                </select>

                <button
                    type="submit"
                    disabled={saving}
                    className="
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                        disabled:opacity-60
                    "
                >
                    {
                        saving
                            ? "Saving..."
                            : "Save Changes"
                    }
                </button>

            </form>

            <ChangePasswordForm
                form={passwordForm}
                errors={passwordErrors}
                loading={passwordLoading}
                onChange={handlePasswordChange}
                onSubmit={handlePasswordSubmit}
            />

        </AppLayout>

    );
}