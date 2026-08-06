import { toast } from "sonner";
import { useNotifications } from "../../context/NotificationContext";

import { useState, useEffect } from "react";

import Modal from "../common/Modal";
import categoryService from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

// Edit category modal
export default function EditCategoryModal({
    open,
    onClose,
    category,
    onSuccess,
}) {

    const [form, setForm] = useState({
        name: "",
        type: "expense",
        color: "#2563EB",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { addNotification } = useNotifications();

    useEffect(() => {

        if (!category) {
            return;
        }

        setForm({
            name: category.name,
            type: category.type,
            color: category.color,
        });

    }, [category]);

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);
        setErrors({});

        try {

            await categoryService.updateCategory(
                category.id,
                form
            );
            addNotification(
                `Category "${form.name}" updated`
            );
            setForm({
                name: "",
                type: "expense",
                color: "#2563EB",
            });
            toast.success("Category updated successfully.");

            onSuccess();
            onClose();

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(error.response.data.errors);

            } else if (error.response?.status === 409) {

                setErrors({
                    name: "Category already exists.",
                });

            } else {

                toast.error(
                    error.response?.data?.message ??
                    "Something went wrong."
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

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));
    }

    return (

        <Modal
            isOpen={open}
            title="Update Category"
            onClose={onClose}
        >

            <CategoryForm
                form={form}
                errors={errors}
                loading={loading}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={onClose}
                submitText="Update Category"
            />

        </Modal>
    );
}