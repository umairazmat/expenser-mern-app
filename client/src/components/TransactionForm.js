import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState, useEffect } from "react";
import { Autocomplete, Box, Container } from "@mui/material";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const InitialForm = {
  amount: "",
  title: "",
  description: "",
  date: new Date(),
  category_id: "",
  type: "expenses",
};

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
}) {
  const authState = useSelector((state) => state.auth);
  const { categories } = authState.user || {}; // Use empty object as a fallback

  const token = Cookies.get("token");
  const [form, setForm] = useState(InitialForm);
  const types = ["expense", "income", "transfer"];
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (
      editTransaction.amount !== undefined &&
      editTransaction.title !== undefined &&
      editTransaction.description !== undefined &&
      editTransaction.date !== undefined &&
      editTransaction.category_id !== undefined &&
      editTransaction.type !== undefined
    ) {
      setForm(editTransaction);
      setIsUpdating(true);
    } else {
      setForm(InitialForm);
      setIsUpdating(false);
    }
  }, [editTransaction]);

  function handleInput(e) {
    // console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = isUpdating ? await update() : await create();

      // console.log("Working");
      // console.log(form);

      if (res && res.ok) {
        const data = await res.json();
        // console.log("Response from Post", data); // Log the response data
        fetchTransactions(); // Fetch updated transactions
        setForm(InitialForm); // Reset the form
      } else {
        // console.log("Error occurred while submitting the transaction");
      }
    } catch (error) {
      console.error("An error occurred while submitting:", error);
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
        Authorization: `Bearer  ${token}`,
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
          Authorization: `Bearer  ${token}`,
        },
      }
    );

    reload(res);
  }

  function getCategoryNameById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography variant="h6" sx={{ paddingBottom: 2 }}>
              Add New Transaction here
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Autocomplete
                value={form.type}
                onChange={(event, newValue) => {
                  setForm({ ...form, type: newValue });
                }}
                id="type"
                options={types}
                sx={{ width: 200, marginRight: 5 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Type" />
                )}
              />
              <TextField
                type="number"
                sx={{ marginRight: 2, marginBottom: 2 }}
                id="outlined-basic"
                label="Amount"
                name="amount"
                variant="outlined"
                value={form.amount}
                onChange={handleInput}
              />
              <TextField
                type="text"
                sx={{ marginRight: 2, marginBottom: 2 }}
                id="outlined-basic"
                label="Title"
                name="title"
                variant="outlined"
                value={form.title}
                onChange={handleInput}
              />
              <TextField
                type="text"
                sx={{ marginRight: 2, marginBottom: 2 }}
                id="outlined-basic"
                label="Description"
                name="description"
                variant="outlined"
                value={form.description}
                onChange={handleInput}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  sx={{ marginRight: 2, marginBottom: 2 }}
                  label="Transaction Date"
                  inputFormat="MM/DD/YYYY"
                  name="date"
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField
                      sx={{ marginRight: 5 }}
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              {categories && categories.length > 0 && (
                <Autocomplete
                  value={getCategoryNameById()}
                  onChange={(event, newValue) => {
                    setForm({ ...form, category_id: newValue._id });
                  }}
                  id="controllable-states-demo"
                  options={categories}
                  sx={{ width: 200, marginRight: 5 }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Category" />
                  )}
                />
              )}
              {isUpdating ? (
                <Button
                  color="secondary"
                  type="submit"
                  name="update"
                  variant="contained"
                  size="small"
                  label="Update"
                  sx={{ marginRight: 2, marginBottom: 2, width: 100 }}
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
                  sx={{ marginRight: 2, marginBottom: 2, width: 100 }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
