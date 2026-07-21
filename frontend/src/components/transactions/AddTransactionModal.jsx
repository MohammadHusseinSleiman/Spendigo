import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import transactionService from "../../services/transactionService";
import TransactionForm from "./TransactionForm";

// Modal for creating a new transaction
export default function AddTransactionModal({
    isOpen,
    onClose,
    onSuccess,
}) {

    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        type: "expense",
        category_id: "",
        description: "",
        amount: "",
        transaction_date: today,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Load categories whenever the transaction type changes
    useEffect(() => {

        if (!isOpen) {
            return;
        }

        loadCategories();

    }, [
        form.type,
        isOpen,
    ]);
    async function loadCategories() {

        try {

            const data =
                await transactionService.getCategories(
                    form.type
                );
            setCategories(data);

            if (data.length > 0) {

                setForm(previous => ({
                    ...previous,
                    category_id: data[0].id,
                }));
            }

        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(event) {

        const {
            name,
            value,
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();
        setErrors({});
        setLoading(true);

        try {

            await transactionService.create(form);
            onSuccess();
            onClose();

        } catch (error) {

            if (
                error.response?.status === 422
            ) {

                setErrors(
                    error.response.data.errors
                );

            } else {
                console.error(error);
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            title="Add Transaction"
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
            />

        </Modal>
    );
}