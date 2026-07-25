import { useState, useEffect } from "react";

import AppLayout from "../components/layout/AppLayout";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import EditTransactionModal from "../components/transactions/EditTransactionModal";
import DeleteTransactionModal from "../components/transactions/DeleteTransactionModal";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionsTable from "../components/transactions/TransactionsTable";
import transactionService from "../services/transactionService";

export default function Transactions() {

    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    const [month, setMonth] = useState("");

    useEffect(() => {
        loadTransactions(); 
    }, [
        search,
        type,
        categoryId,
        month,
    ]);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadTransactions() {
        const data = await transactionService.getTransactions({
            search,
            type,
            category_id: categoryId,
            month,
        });
        setTransactions(data);
    }

    async function loadCategories() {
        const data = await transactionService.getAllCategories();
        setCategories(data);
    }

    async function handleDelete() {

        setDeleteLoading(true);

        try {

            await transactionService.delete(
                deleteId
            );

            setDeleteOpen(false);
            setDeleteId(null);
            loadTransactions();

        } finally {
            setDeleteLoading(false);
        }
    }

    return (

        <AppLayout
            title="Transactions"
            description="Manage your income and expenses"
        >

            <TransactionsHeader
                onAdd={() =>
                    setModalOpen(true)
                }
            />

            <AddTransactionModal
                isOpen={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                onSuccess={() => {
                    loadTransactions();
                }}
            />

            <EditTransactionModal
                transactionId={editId}
                isOpen={editOpen}
                onClose={() => {
                    setEditOpen(false);
                    setEditId(null);
                }}
                onSuccess={loadTransactions}
            />

            <DeleteTransactionModal
                isOpen={deleteOpen}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteId(null);
                }}
                onConfirm={handleDelete}
                loading={deleteLoading}
            />

            <TransactionFilters
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                categories={categories}
                month={month}
                setMonth={setMonth}
            />

            <TransactionsTable
                transactions={transactions}
                onEdit={(id) => {
                    setEditId(id);
                    setEditOpen(true);
                }}
                onDelete={(id) => {
                    setDeleteId(id);
                    setDeleteOpen(true);
                }}
            />

        </AppLayout>

    );
}