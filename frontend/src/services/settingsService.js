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

};