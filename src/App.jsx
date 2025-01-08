import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [transactionSet, setTransactionsSet] = useState([]);
  const [transactions, setTransactions] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    console.log(transactionSet);
  }, [transactionSet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactions({
      ...transactions,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transactions);

    setTransactionsSet([...transactionSet, transactions]);
    setTransactions({
      name: "",
      amount: "",
      date: "",
      category: "",
    });
  };
  return (
    <>
      <form className="addExpense" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          value={transactions.name}
          required
        ></input>
        <input
          type="number"
          placeholder="amount"
          name="amount"
          onChange={handleChange}
          value={transactions.amount}
          required
        ></input>
        <input
          type="date"
          placeholder="date"
          name="date"
          onChange={handleChange}
          value={transactions.date}
          required
        ></input>
        <input
          type="text"
          placeholder="category"
          name="category"
          onChange={handleChange}
          value={transactions.category}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
