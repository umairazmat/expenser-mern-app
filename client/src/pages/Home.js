import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import TransactionChart from "../components/TransactionChart";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await res.json();
    setTransactions(data);
    console.log("from server:", data);
  }

  return (
    <>
      {" "}
      <Container>
        <TransactionChart data={transactions} />
        <TransactionForm
          fetchTransactions={fetchTransactions}
          editTransaction={editTransaction}
        />
        <TransactionsList
          data={transactions}
          fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </>
  );
}
