import AppBar from './components/AppBar';
import TransactionForm from './components/TransactionForm';
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
    <TransactionForm fetchTransactions={fetchTransactions}/>
        <br/>
      <section>
        <table style={{ border: "1px solid" }}>
          <thead>
            <th>Amount</th>
            <th>Title</th>
            <th>Description</th>
            <th>Create At</th>
          </thead>
          <tbody>
          {transactions.map((trx) => (
              <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.title}</td>
                <td>{trx.description}</td>
                <td>{trx.createdAt}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
