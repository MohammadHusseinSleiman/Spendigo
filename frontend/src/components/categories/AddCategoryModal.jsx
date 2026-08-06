import { useState } from "react";

import { toast } from "sonner";

import Modal from "../common/Modal";
import categoryService from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

// Add category modal
export default function AddCategoryModal({
    open,
    onClose,
    onSuccess,
}) {

    const [form, setForm] = useState({
        name: "",
        type: "expense",
        color: "#2563EB",
    });

    const [name, setName] = useState("");
    const [type, setType] = useState("expense");
    const [color, setColor] = useState("#2563EB");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    async function handleSubmit() {

        setLoading(true);
        setErrors({});

        try {

            await categoryService.createCategory({
                name,
                type,
                color,
            });

            setName("");
            setType("expense");
            setColor("#2563EB");
            onSuccess();
            onClose();
            toast.success("Category created successfully.");

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(
                    error.response.data.errors
                );

            } else if (
                error.response?.status === 409
            ) {

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
            title="Add Category"
            onClose={onClose}
        >

            <CategoryForm
                form={form}
                errors={errors}
                loading={loading}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={onClose}
                submitText="Add Category"
            />

        </Modal>
    );
}