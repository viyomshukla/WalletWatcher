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

export default function BasicTable(props) {
  async function handledelete(id){
    const token = Cookies.get("token");
    console.log("id",id);
    if(window.confirm("Are you sure  ")){
  const res=await fetch(`https://walletwatcher-3.onrender.com/trans/${id}`,{   //use backtrick for delete
    method:"DELETE",
    headers: {
    Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    alert("Deleted successfully");
    props.fetchtransaction();
    
  }
  
  else{
    return;
  }
  }

 
}
function handledate(date){
  return dayjs(date).format("DD MMM YYYY")
}
 props.trans.sort((a, b) => new Date(b.date) - new Date(a.date));

  
  return (
    <>
    <TableContainer component={Paper} style={{width:1300,marginLeft:"110px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <h2 style={{marginLeft:"25px"}}>List Of Transaction</h2>
          <TableRow>
            <TableCell align="center">Amount(in Rs)</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date&nbsp;</TableCell>
            <TableCell align="center">Update&nbsp;</TableCell>
            <TableCell align="center">Delete&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trans.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                Rs {row.price}
              </TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center">{handledate(row.date)}</TableCell>
              <TableCell align="center"><Button color="secondary" onClick={()=>props.edittransaction(row)}><ModeEditIcon/></Button></TableCell>
              <TableCell align="center"><Button color="secondary"onClick={()=>handledelete(row._id)}><DeleteIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}