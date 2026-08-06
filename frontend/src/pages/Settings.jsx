import { useEffect, useState } from "react";

import { toast } from "sonner";

import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import PreferencesCard from "../components/settings/PreferencesCard";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";

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

    const [preferences, setPreferences] = useState({
        currency: "USD",
        dark_mode: false,
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const photoUrl = profile.photo
        ? `${import.meta.env.VITE_API_URL}/uploads/profile.php?file=${profile.photo.split("/").pop()}`
        : "/default-avatar.png";

    useEffect(() => {
        loadProfile();
        loadPreferences();
    }, []);

    async function loadProfile() {

        try {

            const data = await settingsService.getProfile();
            setProfile(data);
            setPreferences({
                currency: data.currency,
                dark_mode: data.dark_mode,
            });

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
            toast.success("Profile updated successfully.");

        } catch (error) {

            if ( error.response?.status === 422 ) {

                setErrors( error.response.data.errors );

            } else {
                toast.error(
                    error.response?.data?.message ??
                    "Something went wrong."
                );
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
            toast.success("Password changed successfully.");

        } catch (error) {

            if (error.response?.status === 422) {

                setPasswordErrors(
                    error.response.data.errors
                );

            } else {

                toast.error(
                    error.response?.data?.message ??
                    "Unable to change password."
                );
            }

        } finally {
            setPasswordLoading(false);
        }
    }

    async function handlePhotoChange(event) {

        const file = event.target.files[0];

        if (!file) { return; }

        try {

            await settingsService.uploadPhoto( file );
            loadProfile();
            toast.success("Photo updated successfully.");

        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                "Something went wrong."
            );
        }
    }

    // Preferences
    async function loadPreferences() {

        const data = await settingsService.getPreferences();
        setPreferences(data);
    }

    async function handlePreferencesSubmit() {

        try {

            setLoading(true);
            await settingsService.updatePreferences( preferences );
            await loadPreferences();
            toast.success("Preferences updated successfully.");

        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteAccount( password ) {

        setDeleteLoading(true);

        try {

            await settingsService.deleteAccount(
                password
            );
            localStorage.removeItem("token");
            toast.success("Account deleted successfully.");
            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to delete account."
            );

        } finally {

            setDeleteLoading(false);
            setShowDeleteModal(false);
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

                <img
                    src={photoUrl}
                    alt="Profile"
                    className="
                        h-28
                        w-28
                        rounded-full
                        object-cover
                        border
                        border-slate-300
                    "
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                />

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

            <PreferencesCard
                loading={loading}
                onClick={handlePreferencesSubmit}
                preferences={preferences}
                setPreferences={setPreferences}
            />

            <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-semibold">
                    Danger Zone
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Permanently delete your account.
                </p>

                <button
                    type="button"
                    onClick={() =>{
                        setShowDeleteModal(true);
                        toast.warning("This action cannot be undone.");
                    }}
                    className="
                        mt-5
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        text-white
                    "
                >
                    Delete Account
                </button>

            </div>

            <DeleteAccountModal
                open={showDeleteModal}
                loading={deleteLoading}
                onClose={() =>
                    setShowDeleteModal(false)
                }
                onConfirm={handleDeleteAccount}
            />

        </AppLayout>

    );
}