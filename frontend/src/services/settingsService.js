import api from "../api/axios";

export default {

    // Get profile
    async getProfile() {

        const response = await api.get(
            "/settings/profile.php"
        );

        return response.data.data;
    },

    // Update profile
    async updateProfile(data) {

        const response = await api.put(
            "/settings/profile.php",
            data
        );

        return response.data;
    },

    // Change password
    async changePassword(data) {

        const response = await api.put(
            "/settings/password.php",
            data
        );

        return response.data;
    },

    // Upload photo
    async uploadPhoto(file) {

        const formData = new FormData();

        formData.append(
            "photo",
            file
        );

        const response = await api.post(
            "/settings/upload_photo.php",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data.data;
    },

    // Get preferences
    async getPreferences() {
        const response = await api.get(
            "/settings/preferences.php"
        );

        return response.data.data;
    },
    
    // Update preferences
    async updatePreferences(data) {
        await api.put(
            "/settings/preferences.php",
            data
        );
    },

    // Delete Account
    async deleteAccount(password) {

        return api.delete(
            "/settings/delete_account.php",
            {
                data: {
                    password,
                },
            }
        );
    },

};