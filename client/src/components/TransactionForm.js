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
import { Container } from "@mui/material";

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
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (
      editTransaction.amount !== undefined &&
      editTransaction.title !== undefined &&
      editTransaction.description !== undefined &&
      editTransaction.date !== undefined
    ) {
      setForm(editTransaction);
      setIsUpdating(true);
    } else {
      setForm(InitialForm);
      setIsUpdating(false);
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

    const res = isUpdating ? await update() : await create();
    console.log("Working");
    console.log(form);

    if (res && res.ok) {
      const data = await res.json();
      console.log("from Post", data);
      fetchTransactions();
      setForm(InitialForm);
    } else {
      console.log("Error occurred while submitting the transaction");
    }
  }

  function reload(res) {
    if (res.ok) {
      fetchTransactions();
      setForm(InitialForm);
      setIsUpdating(false);
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify({ ...form }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ ...form }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    reload(res);
  }

  return (
    <>
    <Container maxWidth="lg" sx={{marginTop: 10 ,  display: 'flex', justifyContent: 's', alignItems: 'center' }}>
    <Card sx={{ minWidth: 300,  }}>
        <CardContent>
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>
            Add New Transaction here
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              sx={{ marginRight: 2 ,marginBottom:2 }}
              id="outlined-basic"
              label="Amount"
              name="amount"
              variant="outlined"
              value={form.amount}
              onChange={handleInput}
            />
            <TextField
              type="text"
              sx={{ marginRight: 2,marginBottom:2 }}
              id="outlined-basic"
              label="Title"
              name="title"
              variant="outlined"
              value={form.title}
              onChange={handleInput}
            />
            <TextField
              type="text"
              sx={{ marginRight: 2,marginBottom:2 }}
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              value={form.description}
              onChange={handleInput}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
               sx={{ marginRight: 2, marginBottom:2 }}
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                name="date"
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                )}
              />
            </LocalizationProvider>
            {isUpdating ? (
          <Button
            color="secondary"
            type="submit"
            name="update"
            variant="contained"
            size="large"
            label="Update"
           
            
          >
            Update
          </Button>
        ) : (
          <Button
            color="primary"
            type="submit"
            name="submit"
            variant="contained"
            size="large"
            label="Submit"
           
          >
            Submit
          </Button>
        )}
          </form>
        </CardContent>
      </Card>
    </Container>
     
    </>
  );
}
