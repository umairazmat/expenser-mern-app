import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from "react";
import { create } from "@mui/material/styles/createTransitions";

const InitialForm = {
  amount: "",
  title: "",
  description: "",
  date: new Date(),
};

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
}) {
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined ) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function handleInput(e) {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const res =
      editTransaction.amount === undefined ? await create() : await update();
    console.log("Working");
    console.log(form);
  
    if (res && res.ok) {
      // Check if the response is defined and successful
      const data = await res.json();
      console.log("from Post", data);
      fetchTransactions();
      setForm(InitialForm); // Clear the form fields
    } else {
      console.log("Error occurred while submitting the transaction");
    }
  }
  

  function reload(res) {
    if (res.ok) {
      fetchTransactions();
      setForm(InitialForm);
    }
  }
  
  async function create() {
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify({ ...form }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      reload(res);
  }
  
  async function update() {
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...form }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      reload(res);
  }
  
  return (
    <>
      <Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>
            Add New Transaction here
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              sx={{ marginRight: 3 }}
              id="outlined-basic"
              label="Amount"
              name="amount"
              variant="outlined"
              value={form.amount}
              onChange={handleInput}
            />
            <TextField
              type="text"
              sx={{ marginRight: 3 }}
              id="outlined-basic"
              label="Title"
              name="title"
              variant="outlined"
              value={form.title}
              onChange={handleInput}
            />
            <TextField
              type="text"
              sx={{ marginRight: 3 }}
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              value={form.description}
              onChange={handleInput}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                name="date"
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>

            {editTransaction.amount !== undefined  && (
              <Button
                color="secondary"
                type="submit"
                name="update"
                variant="contained"
                size="large"
                label="Update"
                value={form.submit}
                sx={{ marginLeft: 5 }}
              >
                Update
              </Button>
            )}
            {editTransaction.amount === undefined && (
              <Button
                color="primary"
                type="submit"
                name="submit"
                variant="contained"
                size="large"
                label="Submit"
                value={form.submit}
                sx={{ marginLeft: 5 }}
              >
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
