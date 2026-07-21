import api from "../api/axios";

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

        return response.data;
    },

    
    // Get transactions
    async getTransactions(filters = {}) {

        const response = await api.get(
            "/transactions/index.php",
            {
                params: filters,
            }
        );

        return response.data.data;
    },
};
export default transactionService;