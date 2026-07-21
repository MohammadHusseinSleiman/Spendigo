import { useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionsTable from "../components/transactions/TransactionsTable";
import transactionService from "../services/transactionService";

export default function Transactions() {

    const [search,setSearch] = useState("");
    const [type,setType] = useState("all");
    const [transactions, setTransactions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadTransactions(); 
    }, [search, type]);

    async function loadTransactions() {
        const data = await transactionService.getTransactions({
            search,
            type,
        });
        setTransactions(data);
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

            <TransactionFilters
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
            />

            <TransactionsTable
                transactions={transactions}
            />

        </AppLayout>

    );
}