import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

// Set API Base URL dynamically
const API_BASE_URL = "https://walletwatcher-3.onrender.com" || "http://localhost:4000";

export default function BasicTable(props) {
  
  async function handledelete(id) {
    const token = Cookies.get("token");

    if (!token) {
      alert("Unauthorized: No token found");
      return;
    }

    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/trans/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          alert("Transaction deleted successfully!");
          props.fetchtransaction();  // Refresh the list after deletion
        } else {
          const errorMsg = await res.text();
          alert(`Error: ${errorMsg}`);
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction. Please try again.");
      }
    }
  }

  function handledate(date) {
    return dayjs(date).format("DD MMM YYYY");
  }

  // Sorting transactions by date (latest first)
  props.trans.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <TableContainer component={Paper} style={{ width: 1300, marginLeft: "110px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h2 style={{ marginLeft: "25px" }}>List of Transactions</h2>
            <TableRow>
              <TableCell align="center"><strong>Amount (in Rs)</strong></TableCell>
              <TableCell align="center"><strong>Description</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Update</strong></TableCell>
              <TableCell align="center"><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trans.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  Rs {row.price}
                </TableCell>
                <TableCell align="center">{row.desc}</TableCell>
                <TableCell align="center">{handledate(row.date)}</TableCell>
                <TableCell align="center">
                  <Button color="secondary" onClick={() => props.edittransaction(row)}>
                    <ModeEditIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button color="secondary" onClick={() => handledelete(row._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
