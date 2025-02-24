import React, { useEffect, useState } from 'react';
import BasicCard from './cardbar';
import BasicTable from './table';
import Cookies from 'js-cookie';
import Demo from './graph';

function Form() {
  const [transactions, setTransactions] = useState([]);
  const [transactions1, setTransactions1] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);
  const API_BASE_URL = "https://walletwatcher-3.onrender.com" || "http://localhost:4000";
  async function fetchTransactions() {
    const token = Cookies.get("token");
    if (!token) {
      console.log("No token found, please login.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/trans`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data, data1 } = await res.json();
      setTransactions(data);
      setTransactions1(data1);
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  return (
    <>
      <div>
        <Demo trans={transactions} />
        <BasicCard fetchtransaction={fetchTransactions} edittransaction={editTransaction} />
        <br />
        <br />
        <br />
        <BasicTable trans={transactions1} fetchtransaction={fetchTransactions} edittransaction={setEditTransaction} />
      </div>
    </>
  );
}

export default Form;
