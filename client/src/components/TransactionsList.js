import React, { useEffect } from "react";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function TransactionsList({
  data,
  fetchTransactions,
  setEditTransaction,
}) {

  
  
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");
    if (!hasReloaded && user) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, [user]);



  function categoryName(id) {

    if (!user || !user.categories) return "NA";
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "Not Found";
  }

  const token = Cookies.get("token");
  let rowNumber = 1;

  async function removeTransaction(_id) {
    console.log(_id);
    if (!window.confirm("Are you sure you want to delete the transaction?"))
      return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${token}`,
          },
        }
      );

      if (res.ok) {
        fetchTransactions();
        console.log("Transaction deleted");
        window.alert("Transaction deleted successfully");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete transaction");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      // Handle the error appropriately, such as showing an error message to the user
    }
  }

  function format(date) {
    return dayjs(date).format("DD MMM, YYYY");
  }

  return (
    <>
      <Box sx={{ marginTop: "20px", overflowX: "auto" }}>
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Transactions List
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
          <Table
            sx={{ overflowX: "auto" }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Categories</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((month) =>
              month.transactions.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      flexWrap: "wrap",
                    }}
                  >
                    <TableCell align="center">{rowNumber++}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.amount}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
                      {categoryName(row.category_id)}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{format(row.date)}</TableCell>
                    <TableCell align="center">
                      {/* Edit Button  */}
                      <IconButton
                        aria-label="edit"
                        onClick={() => setEditTransaction(row)}
                      >
                        <EditSharpIcon />
                      </IconButton>
                      {/* Delete Button */}
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeTransaction(row._id)}
                      >
                        <DeleteSharpIcon color="warning" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
