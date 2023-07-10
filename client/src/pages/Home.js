import React from 'react'
import { useEffect, useState } from "react";
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import Container from '@mui/material/Container';

export default function Home() {
    
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
    console.log("from server:", data);
  }

  return (
    <> <Container >
    <TransactionForm 
    fetchTransactions={fetchTransactions}
    editTransaction={editTransaction}
    />
    <TransactionsList 
    transactions={transactions} 
    fetchTransactions={fetchTransactions}
    setEditTransaction={setEditTransaction}
    />
    </Container></>
  )
}
