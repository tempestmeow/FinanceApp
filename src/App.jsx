import { useState, useEffect } from "react";
import "./App.css";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Line } from "react-chartjs-2";
import BtcIcon from "./components/btc.jsx";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [expenseTransactionSet, setExpenseTransactionsSet] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState({
    name: "Foods",
    amount: 2000,
    date: new Date().toISOString().substring(0, 10),
    description: "Groceries",
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  });

  const [incomeTransactions, setIncomeTransactions] = useState({
    name: "Sweldo",
    amount: 5000,
    date: new Date().toISOString().substring(0, 10),
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
        date: new Date().toISOString().substring(0, 10),
        description: "Grocery",
      });
    } else if (expense === "income") {
      setIncomeTransactionsSet([...incomeTransactionSet, incomeTransactions]);
      setIncomeTransactions({
        name: "Sweldo",
        amount: 5000,
        date: new Date().toISOString().substring(0, 10),
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

  function getBalance() {
    return totalIncome - totalExpenses;
  }

  const incomeData = {
    labels: incomeTransactionSet.map((transaction) => transaction.name),
    datasets: [
      {
        data: incomeTransactionSet.map((transaction) => transaction.amount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const expenseData = {
    labels: expenseTransactionSet.map((transaction) => transaction.name),
    datasets: [
      {
        data: expenseTransactionSet.map((transaction) => transaction.amount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const Utils = {
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const labels = Utils.month.slice(0, 7);
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const [activeButton, setActiveButton] = useState(2);

  const handleButtonClick = (i) => {
    setActiveButton(i);
  };

  const toggleButtonClass = (i) => {
    return activeButton === i ? "activeButton" : "userButton";
  };

  return (
    <>
      <div className="body">
        <div className="userNavigation">
          <button
            className={toggleButtonClass(0)}
            onClick={() => {
              setView("dashboard");
              handleButtonClick(0);
            }}
          >
            Dashboard
          </button>
          <button
            className={toggleButtonClass(1)}
            onClick={() => {
              setView("dashboard");
              handleButtonClick(1);
            }}
          >
            Transactions
          </button>
          <button
            className={toggleButtonClass(2)}
            onClick={() => {
              setView("expense");
              handleButtonClick(2);
            }}
          >
            Expense
          </button>
          <button
            className={toggleButtonClass(3)}
            onClick={() => {
              setView("income");
              handleButtonClick(3);
            }}
          >
            Income
          </button>
          <div></div>
        </div>
        <div className="mainDisplay">
          {view === "expense" && (
            <>
              <div className="expenseForm">
                <div className="formDiv">
                  <div className="formTitle">Expense</div>
                  <form
                    className="addExpense"
                    onSubmit={(e) => handleSubmit(e, "expense")}
                  >
                    <div className="formValue">
                      Total Expense:{" "}
                      <span className="formPrice">${totalExpenses}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      name="name"
                      onChange={(e) => handleChange(e, "expense")}
                      value={expenseTransactions.name}
                      autoComplete="off"
                    ></input>
                    <input
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      onChange={(e) => handleChange(e, "expense")}
                      value={expenseTransactions.amount}
                    ></input>
                    <input
                      type="date"
                      placeholder="Date"
                      name="date"
                      onChange={(e) => handleChange(e, "expense")}
                      value={expenseTransactions.date}
                    ></input>
                    <select className="selectCategory" placeholder="category">
                      <option value="food">Food</option>
                      <option value="grocery">Grocery</option>
                      <option value="bills">Bills</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      onChange={(e) => handleChange(e, "expense")}
                      value={expenseTransactions.description}
                    ></input>
                    <button type="submit" className="submitBtn">
                      + Add Expense
                    </button>
                  </form>
                </div>
                <div className="expenseTransactions">
                  <p className="transactionHeader">Expense Transactions</p>
                  <div className="expenseLists">
                    {expenseTransactionSet.map((transaction, index) => (
                      <div key={index} className="expenseCard">
                        <BtcIcon />
                        <p>{transaction.name}</p>
                        <p>${transaction.amount}</p>
                        <p>{transaction.date}</p>
                        <p>{transaction.description}</p>
                        <button
                          className="deleteButton"
                          onClick={() => handleDelete(index, "expense")}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="totalExpenses"></div>
                  <div className="expenseGraph">
                    <Doughnut data={expenseData} />
                  </div>
                </div>
              </div>
            </>
          )}
          {view === "income" && (
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
                    onChange={(e) => handleChange(e, "income")}
                    value={incomeTransactions.name}
                  ></input>
                  <input
                    type="number"
                    placeholder="amount"
                    name="amount"
                    onChange={(e) => handleChange(e, "income")}
                    value={incomeTransactions.amount}
                  ></input>
                  <input
                    type="date"
                    placeholder="date"
                    name="date"
                    onChange={(e) => handleChange(e, "income")}
                    value={incomeTransactions.date}
                  ></input>
                  <input
                    type="text"
                    placeholder="description"
                    name="description"
                    onChange={(e) => handleChange(e, "income")}
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
                <div className="totalIncomes">
                  Total Income: {totalIncome} PHP
                </div>
                <div className="incomeGraph">income</div>
                <div className="incomeGraph">
                  <Doughnut data={incomeData} />
                </div>
              </div>
            </>
          )}
          {view === "dashboard" && <div>dashboard</div>}
          <div className="balance" onClick={() => console.log(getBalance())}>
            {/* Balance: {balance} PHP{" "} */}
          </div>
          <div className="lineGraph"></div>
        </div>
      </div>
    </>
  );
}

export default App;
