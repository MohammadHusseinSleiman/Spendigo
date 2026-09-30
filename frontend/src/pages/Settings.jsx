import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

import { applyTheme } from "../utils/theme";

import AppLayout from "../components/layout/AppLayout";
import settingsService from "../services/settingsService";

import ProfileForm from "../components/settings/ProfileForm";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import PreferencesCard from "../components/settings/PreferencesCard";
import DeleteAccountCard from "../components/settings/DeleteAccountCard";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";

import SettingsSkeleton from "../components/common/skeletons/SettingsSkeleton";

export default function Settings() {

    const navigate = useNavigate();
    const { addNotification } = useNotifications();

    // Profile
    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        bio: "",
        currency: "USD",
        photo: null,
    });
    const photoUrl = profile.photo
        ? `${import.meta.env.VITE_API_URL}/uploads/profile.php?file=${encodeURIComponent(
            profile.photo.split("/").pop()
        )}`
        : "/default-avatar.png";
    const [originalProfile, setOriginalProfile] = useState(null);
    const { updateUser } = useAuth();
    const isProfileDirty =
        originalProfile &&
        (
            profile.full_name !== originalProfile.full_name ||
            profile.email !== originalProfile.email ||
            profile.bio !== originalProfile.bio ||
            profile.currency !== originalProfile.currency
        );

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // Password
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    // Preferences
    const [preferencesLoading, setPreferencesLoading] = useState(false);
    const [preferences, setPreferences] = useState({
        currency: "USD",
        dark_mode: false,
    });

    // Delete account
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Load all settings data
    useEffect(() => {

        async function loadSettings() {

            try {

                const [
                    profileData,
                    preferencesData,
                ] = await Promise.all([
                    settingsService.getProfile(),
                    settingsService.getPreferences(),
                ]);

                setProfile(profileData);
                setOriginalProfile(profileData);

                setPreferences({
                    dark_mode: preferencesData.dark_mode ?? false,
                });

                applyTheme(
                    preferencesData.dark_mode ?? false
                );

            } catch (error) {

                toast.error(
                    error.response?.data?.message ??
                    "Unable to load settings."
                );

            } finally {
                setLoading(false);
            }
        }
        loadSettings();
    }, []);

    // Profile photo
    async function handlePhotoChange(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const data = await settingsService.uploadPhoto(file);

            addNotification("Profile photo updated");

            toast.success(
                "Photo updated successfully."
            );

            updateUser({
                photo: data.photo,
            });

            setProfile(previous => ({
                ...previous,
                photo: data.photo,
            }));

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to update profile photo."
            );

        } finally {
            event.target.value = "";
        }
    }

    // Profile
    function handleProfileChange(event) {

        const {
            name,
            value,
        } = event.target;

        setProfile(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleProfileSubmit(event) {

        event.preventDefault();

        setSaving(true);
        setErrors({});

        try {

            await settingsService.updateProfile(
                profile
            );

            setOriginalProfile(profile);

            updateUser({
                full_name: profile.full_name,
                email: profile.email,
            });

            addNotification("Profile updated");

            toast.success(
                "Profile updated successfully."
            );

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(
                    error.response.data.errors ?? {}
                );

            } else {

                toast.error(
                    error.response?.data?.message ??
                    "Unable to update profile."
                );
            }

        } finally {
            setSaving(false);
        }
    }

    // Password
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

            await settingsService.changePassword(
                passwordForm
            );

            addNotification("Password changed");

            toast.success(
                "Password changed successfully."
            );

            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });

        } catch (error) {

            if (
                error.response?.status === 422
            ) {

                setPasswordErrors(
                    error.response.data.errors ?? {}
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

    // Delete account
    async function handleDeleteAccount(
        password
    ) {

        setDeleteLoading(true);

        try {

            await settingsService.deleteAccount(
                password
            );

            localStorage.removeItem("token");

            toast.success(
                "Account deleted successfully."
            );

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
        return (
            <AppLayout
                title="Settings"
                description="Manage your account preferences"
            >
                <SettingsSkeleton />
            </AppLayout>
        );
    }

    return (

        <AppLayout
            title="Settings"
            description="Manage your account preferences"
        >

            {/* Profile */}
            <ProfileForm
                profile={profile}
                errors={errors}
                loading={saving}
                disabled={!isProfileDirty}
                onChange={handleProfileChange}
                onSubmit={handleProfileSubmit}
                photoUrl={photoUrl}
                onPhotoChange={handlePhotoChange}
            />

            {/* Security */}
            <ChangePasswordForm
                form={passwordForm}
                errors={passwordErrors}
                loading={passwordLoading}
                onChange={handlePasswordChange}
                onSubmit={handlePasswordSubmit}
            />

            {/* Preferences */}
            <PreferencesCard />

            {/* Danger Zone */}
            <DeleteAccountCard
                onClick={() => setShowDeleteModal(true)}
            />

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