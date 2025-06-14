import React, { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "../component/cardbar.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function BasicCard(props) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    number: "",
    desc: "",
    date: "",
  });

  // Handle visibility with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setForm((prevform) => ({ ...prevform, [name]: value }));
  };

  useEffect(() => {
    if (props.edittransaction.price !== undefined) {
      setForm({
        number: props.edittransaction.price,
        desc: props.edittransaction.desc,
        date: formatdate(props.edittransaction.date),
      });
    }
  }, [props.edittransaction]);

  function formatdate(date) {
    if (!date) return "";
    const d = new Date(date);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://walletwatcher-3.onrender.com"
      : "http://localhost:4000";

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    const token = Cookies.get("token");

    try {
      let res;
      if (props.edittransaction.price === undefined) {
        // Create new transaction
        res = await fetch(`${API_BASE_URL}/trans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        // Update existing transaction
        res = await fetch(`${API_BASE_URL}/trans/${props.edittransaction._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();
      if (res.ok) {
        props.fetchtransaction();
        setMessage("Transaction saved successfully.");
        setForm({ number: "", desc: "", date: "" });
      } else {
        setMessage(data.message || "Failed to save transaction.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }

    setSubmitting(false);
  }

  return (
    <Card ref={cardRef} sx={{ marginTop: 5, width: 890, marginLeft: 40 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            {props.edittransaction.price !== undefined
              ? "Update Transaction"
              : "Add New Transaction"}
          </Typography>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <TextField
              type="number"
              name="number"
              label="Amount (in Rs)"
              required
              variant="outlined"
              value={form.number}
              onChange={handlechange}
            />

            <TextField
              name="desc"
              label="Description"
              variant="outlined"
              required
              value={form.desc}
              onChange={handlechange}
            />

            <input
              type="date"
              name="date"
              className="date-input"
              required
              value={form.date}
              onChange={handlechange}
              style={{
                height: "56px",
                padding: "14px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.23)",
              }}
            />
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" disabled={submitting}>
              {props.edittransaction.price !== undefined ? "Update" : "Submit"}
            </Button>
          </div>

          {message && (
            <Typography variant="body2" color="primary" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
