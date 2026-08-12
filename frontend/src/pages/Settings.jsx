import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useNotifications } from "../context/NotificationContext";

import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";
import ProfileForm from "../components/settings/ProfileForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import PreferencesCard from "../components/settings/PreferencesCard";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner"

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
        dark_mode: false,
    });
    const [preferencesLoading, setPreferencesLoading] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { addNotification } = useNotifications();

    const photoUrl = profile.photo
        ? `${import.meta.env.VITE_API_URL}/uploads/profile.php?file=${profile.photo.split("/").pop()}`
        : "/default-avatar.png";

    const navigate = useNavigate();

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
            document.documentElement.classList.toggle(
                "dark",
                data.dark_mode
            );

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
            addNotification("Profile updated");
            toast.success("Profile updated successfully.");
            await loadProfile();

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
            addNotification("Password changed");
            toast.success("Password changed successfully.");
            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });

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
            addNotification("Profile photo updated");
            toast.success("Photo updated successfully.");
            loadProfile();

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

        setPreferencesLoading(true);

        try {

            await settingsService.updatePreferences(
                preferences
            );
            await loadPreferences();

            document.documentElement.classList.toggle(
                "dark",
                preferences.dark_mode
            );
            addNotification("Application preferences updated");
            toast.success("Preferences updated successfully.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to update preferences."
            );

        } finally {
            setPreferencesLoading(false);
        }
    }

    // Delete Account
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

    if (loading) {
        return <LoadingSpinner />
    }

    return (

        <AppLayout
            title="Settings"
            description="Manage your account preferences"
        >

            <ProfileForm
                profile={profile}
                errors={errors}
                loading={saving}
                onChange={handleChange}
                onSubmit={handleSubmit}
                photoUrl={photoUrl}
                onPhotoChange={handlePhotoChange}
            />

            <ChangePasswordForm
                form={passwordForm}
                errors={passwordErrors}
                loading={passwordLoading}
                onChange={handlePasswordChange}
                onSubmit={handlePasswordSubmit}
            />

            <PreferencesCard
                loading={preferencesLoading}
                onClick={handlePreferencesSubmit}
                preferences={preferences}
                setPreferences={setPreferences}
            />

            <Card className="rounded-2xl bg-white p-6 shadow-sm mt-8">

                <h2 className="text-xl font-semibold">
                    Danger Zone
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Permanently delete your account.
                </p>

                <div className="flex justify-end">
                    <Button
                        type="button"
                        onClick={() =>{
                            setShowDeleteModal(true);
                            toast.warning("This action cannot be undone.");
                        }}
                        className="
                            cursor-pointer
                            mt-5
                            w-full
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            sm:w-auto
                        "
                    >
                        Delete Account
                    </Button>
                </div>

            </Card>

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