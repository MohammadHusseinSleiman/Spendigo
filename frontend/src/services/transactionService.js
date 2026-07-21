import api from "../api/api";

// Transaction API
const transactionService = {

    // Get categories by transaction type
    async getCategories(type) {

        const response = await api.get(
            "/transactions/categories.php",
            {
                params: {
                    type,
                },
            }
        );

        return response.data.data;
    },

    // Create transaction
    async create(data) {

        const response = await api.post(
            "/transactions/store.php",
            data
        );

        return response.data.data;
    },

};
export default transactionService;