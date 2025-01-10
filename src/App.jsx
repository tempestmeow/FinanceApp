import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [expenseTransactionSet, setExpenseTransactionsSet] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState({
    name: "Foods",
    amount: 2000,
    date: "",
    description: "Groceries",
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  });

  const [incomeTransactions, setIncomeTransactions] = useState({
    name: "Sweldo",
    amount: 5000,
    date: "",
    description: "Digima Salary",
  });
  const [incomeTransactionSet, setIncomeTransactionsSet] = useState([]);

  const [view, setView] = useState("expense");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const handleChange = (e, transaction) => {
    const { name, value } = e.target;

    if (transaction === "expense") {
      setExpenseTransactions({
        ...expenseTransactions,
        [name]: value,
      });
    } else if (transaction === "income") {
      setIncomeTransactions({
        ...incomeTransactions,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < expenseTransactionSet.length; i++) {
      sum += expenseTransactionSet[i].amount;
    }
    setTotalExpenses(sum);
  }, [expenseTransactionSet]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < incomeTransactionSet.length; i++) {
      sum += incomeTransactionSet[i].amount;
    }
    setTotalIncome(sum);
  }, [incomeTransactionSet]);

  const handleSubmit = (e, expense) => {
    e.preventDefault();
    if (expense === "expense") {
      setExpenseTransactionsSet([
        ...expenseTransactionSet,
        expenseTransactions,
      ]);
      setExpenseTransactions({
        name: "Foods",
        amount: 2000,
        date: "",
        description: "Grocery",
      });
    } else if (expense === "income") {
      setIncomeTransactionsSet([...incomeTransactionSet, incomeTransactions]);
      setIncomeTransactions({
        name: "Sweldo",
        amount: 5000,
        date: "",
        description: "Digima Salary",
      });
    }
  };

  const handleDelete = (index, transaction) => {
    if (transaction === "income") {
      const transactionsLeft = incomeTransactionSet.filter(
        (_, i) => i !== index
      );
      setIncomeTransactionsSet(transactionsLeft);
    } else {
      const transactionsLeft = expenseTransactionSet.filter(
        (_, i) => i !== index
      );
      setExpenseTransactionsSet(transactionsLeft);
    }
  };
  return (
    <>
      {view === "expense" && (
        <>
          <div className="expense">
            <form
              className="addExpense"
              onSubmit={(e) => handleSubmit(e, "expense")}
            >
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={expenseTransactions.name}
              ></input>
              <input
                type="number"
                placeholder="amount"
                name="amount"
                onChange={handleChange}
                value={expenseTransactions.amount}
              ></input>
              <input
                type="date"
                placeholder="date"
                name="date"
                onChange={handleChange}
                value={expenseTransactions.date}
              ></input>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={expenseTransactions.description}
              ></input>
              <button type="submit">Submit</button>
            </form>
            <div className="expenseList">
              {expenseTransactionSet.map((transaction, index) => (
                <div key={index} className="expenseList">
                  <div className="transactionTitle">{transaction.name}</div>
                  <div className="transactionDetails">
                    <p>{transaction.amount}</p>
                    <p>{transaction.date}</p>
                    <p>{transaction.description}</p>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(index, "expense")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="totalExpenses">
              Total Expense: {totalExpenses} PHP
            </div>
          </div>
        </>
      )}
      {view === "expense" && (
        <>
          <div className="income">
            <form
              className="addIncome"
              onSubmit={(e) => handleSubmit(e, "income")}
            >
              <input
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={incomeTransactions.name}
              ></input>
              <input
                type="number"
                placeholder="amount"
                name="amount"
                onChange={handleChange}
                value={incomeTransactions.amount}
              ></input>
              <input
                type="date"
                placeholder="date"
                name="date"
                onChange={handleChange}
                value={incomeTransactions.date}
              ></input>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={incomeTransactions.description}
              ></input>
              <button type="submit">Submit</button>
            </form>
            <div className="incomeList">
              {incomeTransactionSet.map((transaction, index) => (
                <div key={index} className="incomeList">
                  <div className="transactionTitle">{transaction.name}</div>
                  <div className="transactionDetails">
                    <p>{transaction.amount}</p>
                    <p>{transaction.date}</p>
                    <p>{transaction.description}</p>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(index, "income")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="totalIncomes">Total Income: {totalIncome} PHP</div>
          </div>
        </>
      )}
      <div className="balance">Balance: {balance} PHP </div>
    </>
  );
}

export default App;
