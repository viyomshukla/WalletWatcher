import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "../component/cardbar.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function BasicCard(props) {
  
 const navigate=useNavigate();
  const [form, setForm] = useState({
    number: "",
    desc: "",
    date: "",
  });


  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm((prevform) => ({ ...prevform, [name]: value }));
  };

  useEffect(()=>{
    if(props.edittransaction.price != undefined){
      console.log(props.edittransaction)
      setForm({
        number:props.edittransaction.price,
        desc:props.edittransaction.desc,
        date:formatdate(props.edittransaction.date)
      })
      
    }
 
  },[props.edittransaction])

  function formatdate(date){
    if(!date) return " ";
    else{
      const d = new Date(date);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
    }

  

  async function handleSubmit(e) {
    const token = Cookies.get("token");
    e.preventDefault();
    let res;
    console.log("Form submitted:", form);
    if(props.edittransaction.price==undefined){
       res = await fetch("https://walletwatcher-3.onrender.com/trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });
      console.log("res", res);
    }
    else{
      res = await fetch(`http://localhost:4000/trans/${props.edittransaction._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form),
        
      });
      
    }

    if (res.ok) {
      props.fetchtransaction();
      
    }
    const data = await res.json();
    console.log("res2", data);
    setForm({
      number: "",
      desc: "",
      date: "",
    });
  }
  return (
    <Card sx={{  marginTop: 5, width:890,marginLeft:40}}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" style={{marginBottom:"24px"}}>{props.edittransaction.price !== undefined ? " Update New Transaction" :  "Add New Transaction"}</Typography>
          <TextField
          type="number"
           name="number"
            sx={{ marginRight: 5 }}
            id="outlined-basic-1"
            label="Amount(in Rs)"
            required
            variant="outlined"
            value={form.number}
            onChange={handlechange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic-2"
            name="desc"
            label="Description"
            variant="outlined"
            required
            value={form.desc}
            onChange={handlechange}
          />
          <div className="date-input-container">
            <input
              type="date"
              name="date"
              className="date-input"
              required
              value={form.date}
              onChange={handlechange}
            />
          </div>
         <Button
         type="submit"
         variant="contained"
         style={{ marginLeft: "710px", marginTop: "-78px" }}
       >
         {props.edittransaction.price !== undefined ? "Update" : "Submit"}
       </Button>
 
        </form>
      </CardContent>
    </Card>
  );
}
