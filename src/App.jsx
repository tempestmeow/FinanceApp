import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [transactionSet, setTransactionsSet] = useState([]);
  const [transactions, setTransactions] = useState({
    name: "Sweldo",
    amount: 5000,
    date: "",
    description: "Digima Salary",
  });
  const [view, setView] = useState("expense");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactions({
      ...transactions,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransactionsSet([...transactionSet, transactions]);
    setTransactions({
      name: "Sweldo",
      amount: 5000,
      date: "",
      description: "Digima Salary",
    });
  };

  const handleDelete = (index) => {
    const transactionsLeft = transactionSet.filter((_, i) => i !== index);
    setTransactionsSet(transactionsLeft);
  };
  return (
    <>
      {view === "expense" && (
        <>
          <div className="expense">
            <form className="addExpense" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={transactions.name}
              ></input>
              <input
                type="number"
                placeholder="amount"
                name="amount"
                onChange={handleChange}
                value={transactions.amount}
              ></input>
              <input
                type="date"
                placeholder="date"
                name="date"
                onChange={handleChange}
                value={transactions.date}
              ></input>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={transactions.description}
              ></input>
              <button type="submit">Submit</button>
            </form>
            <div className="expenseList">
              {transactionSet.map((transaction, index) => (
                <div key={index} className="expenseList">
                  <div className="transactionTitle">{transaction.name}</div>
                  <div className="transactionDetails">
                    <p>{transaction.amount}</p>
                    <p>{transaction.date}</p>
                    <p>{transaction.description}</p>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
