import { useEffect, useState } from "react";

import Modal from "../common/Modal";
import TransactionForm from "./TransactionForm";
import transactionService from "../../services/transactionService";

// Edit transaction modal
export default function EditTransactionModal({
    transactionId,
    isOpen,
    onClose,
    onSuccess,
}) {

    const [form, setForm] = useState({
        type: "expense",
        category_id: "",
        description: "",
        amount: "",
        transaction_date: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (!isOpen || !transactionId) {
            return;
        }

        loadTransaction();

    }, [
        isOpen,
        transactionId,
    ]);

    async function loadTransaction() {

        setLoading(true);

        try {

            const transaction =
                await transactionService.getById(
                    transactionId
                );

            const categoryList =
                await transactionService.getCategories(
                    transaction.type
                );

            setCategories(categoryList);
            setForm(transaction);

        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);
        setErrors({});

        try {

            await transactionService.update(
                transactionId,
                form
            );

            onSuccess();
            onClose();

        } catch (error) {

            if (
                error.response?.status === 422
            ) {
                setErrors(
                    error.response.data.errors
                );
            }

        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {

        const {
            name,
            value,
        } = event.target;

        const updatedForm = {
            ...form,
            [name]: value,
        };

        setForm(updatedForm);

        if (name === "type") {
            transactionService
                .getCategories(value)
                .then(setCategories);
        }

    }

    return (

        <Modal
            isOpen={isOpen}
            title="Edit Transaction"
            onClose={onClose}
        >

            <TransactionForm
                form={form}
                errors={errors}
                loading={loading}
                categories={categories}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={onClose}
                submitText="Update Transaction"
            />

        </Modal>

    );
}