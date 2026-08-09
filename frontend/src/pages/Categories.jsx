import { useMemo, useEffect, useState } from "react";

import { toast } from "sonner";

import { useNotifications } from "../context/NotificationContext";

import categoryService from "../services/categoryService";
import AppLayout from "../components/layout/AppLayout";
import CategoriesHeader from "../components/categories/CategoriesHeader";
import CategoriesFilters from "../components/categories/CategoriesFilters";
import CategoriesTable from "../components/categories/CategoriesTable";
import AddCategoryModal from "../components/categories/AddCategoryModal";
import EditCategoryModal from "../components/categories/EditCategoryModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { addNotification } = useNotifications();

    const filteredCategories = useMemo(() => {

        return categories.filter((category) => {

            const matchesSearch =
                category.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesType =
                type === "all"
                    ? true
                    : category.type === type;

            return (
                matchesSearch &&
                matchesType
            );
        });
    }, [
        categories,
        search,
        type,
    ]);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {

            const data = await categoryService.getCategories();
            setCategories(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to load categories."
            );

        } finally {
            setLoading(false);
        }
    }

    function handleEdit(category) {
        setSelectedCategory(category);
        setShowEditModal(true);
    }

    function handleDelete(category) {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {

        if (!selectedCategory) {
            return;
        }
        setDeleteLoading(true);

        try {
            await categoryService.deleteCategory(
                selectedCategory.id
            );
            addNotification(
                "Category deleted"
            );
            setShowDeleteModal(false);
            setSelectedCategory(null);
            await loadCategories();
            toast.success("Category deleted successfully.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "Unable to delete category."
            );

        } finally {
            setDeleteLoading(false);
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (

        <AppLayout
            title="Categories"
            description="Categorize your transactions for easier management."
        >

            <CategoriesHeader
                onAdd={() => {
                    setShowAddModal(true)
                }}
            />

            <CategoriesFilters
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
            />

            <CategoriesTable
                categories={filteredCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AddCategoryModal
                open={showAddModal}
                onClose={() =>
                    setShowAddModal(false)
                }
                onSuccess={loadCategories}
            />

            <EditCategoryModal
                open={showEditModal}
                category={selectedCategory}
                onClose={() =>
                    setShowEditModal(false)
                }
                onSuccess={loadCategories}
            />

            <DeleteCategoryModal
                isOpen={showDeleteModal}
                onClose={() =>
                    setShowDeleteModal(false)
                }
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />

        </AppLayout>

    );

}