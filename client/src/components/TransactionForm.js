import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const InitialForm = {
  amount: 0,
  title: "",
  description: "",
  date: new Date(),
};

export default function TransactionForm({ fetchTransactions }) {
  const [form, setForm] = useState(InitialForm);

  function handleInput(e) {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Working");
    console.log(form);
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    // fetching msg from server
    const data = await res.json();
    console.log("from Post", data);

    if (res.ok) {
      fetchTransactions();
      setForm({ amount: 0, title: "", description: "", date: "" }); // Clear the form fields
    }
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
            <Button
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
          </form>
        </CardContent>
      </Card>
    </>
  );
}
