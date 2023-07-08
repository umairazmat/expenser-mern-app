import AppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";

function App() {
  
  const [transactions, setTransactions] = useState([]);

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
    <>
     <AppBar/>
    <Container >
    <TransactionForm fetchTransactions={fetchTransactions}/>
    <TransactionsList transactions={transactions} />
    </Container>
    </>
  );
}

export default App;
