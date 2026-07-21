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


    // Get a single transaction
    async getById(id) {

        const response = await api.get(
            "/transactions/show.php",
            {
                params: { id },
            }
        );

        return response.data.data;
    },


    // Update transaction
    async update(id, data) {

        const response = await api.put(
            `/transactions/update.php?id=${id}`,
            data
        );

        return response.data;
    },


    // Delete transaction
    async delete(id) {

        const response = await api.delete(
            `/transactions/destroy.php?id=${id}`
        );

        return response.data;
    },
};
export default transactionService;