import api from "../api/axios";

// Category API
const categoryService = {

    // Get all categories
    async getCategories() {

        const response = await api.get(
            "/categories/index.php"
        );

        return response.data.data;
    },

    // Create category
    async createCategory(data) {

        const response = await api.post(
            "/categories/create.php",
            data
        );

        return response.data;
    },

    // Update category
    async updateCategory(id, data) {

        const response = await api.put(
            `/categories/update.php?id=${id}`,
            data
        );

        return response.data;
    },

    // Delete category
    async deleteCategory(id) {

        const response = await api.delete(
            `/categories/delete.php?id=${id}`
        );

        return response.data;
},
};
export default categoryService;