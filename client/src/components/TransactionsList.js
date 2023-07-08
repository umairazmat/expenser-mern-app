import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


export default function TransactionsList({transactions}) {
    let rowNumber = 1;
  return (
    <>
    <Typography variant='h6' sx={{marginTop: "20px" }}>Transactions List</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
           <TableCell align="center">No.</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trx) => (
            <TableRow
              key={trx._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="center">{rowNumber++}</TableCell>
              <TableCell component="th" scope="row"  align="center">{trx.amount}</TableCell>
              <TableCell align="center">{trx.title}</TableCell>
              <TableCell align="center">{trx.description}</TableCell>
              <TableCell align="center">{trx.date}</TableCell>
              <TableCell align="center">edit    delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}