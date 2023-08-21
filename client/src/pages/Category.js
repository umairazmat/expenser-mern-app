import * as React from "react";
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
import { Typography, Box, Container } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/auth.js";
import CategoryForm from "../components/CategoryForm.js";

export default function Category() {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  let rowNumber = 1;
  const dispatch = useDispatch();

  const [editCategory, setEditCategory] = React.useState({});

  function setEdit(category) {
    setEditCategory(category);
  }
  
  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
        const _user = {
          ...user,
          categories: user.categories.filter((cat) => cat._id != id),
        };
        dispatch(getUser({ user: _user }));
      }
  }

  return (
    <Container>
     <CategoryForm editCategory={editCategory} />
      <Box sx={{ marginTop: "20px", overflowX: "auto" }}>
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          List of Categories
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
                <TableCell align="center">Label</TableCell>
                <TableCell align="center">Icon</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.categories.map((trx) => (
                <TableRow
                  key={trx._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    flexWrap: "wrap",
                  }}
                >
                  <TableCell align="center">{rowNumber++}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {trx.label}
                  </TableCell>
                  <TableCell align="center">{trx.icon}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button  */}
                    <IconButton
                      aria-label="edit"
                      // onClick={ () =>  setEditTransaction(trx) }
                      onClick={() => setEdit(trx)}
                    >
                      <EditSharpIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      aria-label="delete"
                      onClick={() => remove(trx._id)}
                    >
                      <DeleteSharpIcon color="warning" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
