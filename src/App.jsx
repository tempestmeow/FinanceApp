import { useState, useEffect } from "react";
import "./App.css";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import BtcIcon from "./components/btc.jsx";
import {
  Chart as ChartJS,
  BarElement,
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
  BarElement,
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
    quarter: 1,
    type: "expense",
  });

  const [totalTransactions, setTotalTransactions] = useState([]);

  const [balance, setBalance] = useState(0);

  const [incomeTransactions, setIncomeTransactions] = useState({
    name: "Sweldo",
    amount: 5000,
    date: new Date().toISOString().substring(0, 10),
    description: "Digima Salary",
    quarter: 1,
    type: "expense",
  });
  const [incomeTransactionSet, setIncomeTransactionsSet] = useState([]);

  const [view, setView] = useState("expense");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  let [quarter, setQuarter] = useState(1);

  const handleChange = (e, transaction) => {
    const { name, value } = e.target;

    if (name === "date") {
      let splitDate = value.split("-");

      let month = parseInt(splitDate[1], 10);

      const calculatedQuarter = Math.ceil(month / 3);
      setQuarter(calculatedQuarter);
      if (transaction === "expense") {
        setExpenseTransactions({
          ...expenseTransactions,
          [name]: value,
          quarter: calculatedQuarter,
          type: "expense",
        });
      } else if (transaction === "income") {
        setIncomeTransactions({
          ...incomeTransactions,
          [name]: value,
          quarter: calculatedQuarter,
          type: "income",
        });
      }
    } else {
      if (transaction === "expense") {
        setExpenseTransactions({
          ...expenseTransactions,
          [name]: value,
          quarter: quarter,
          type: "expense",
        });
      } else if (transaction === "income") {
        setIncomeTransactions({
          ...incomeTransactions,
          [name]: value,
          quarter: quarter,
          type: "income",
        });
      }
    }
  };

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  // useEffect(() => {
  //   console.log(expenseTransactionSet.map((transaction) => transaction.type));
  // }, [expenseTransactionSet]);

  // useEffect(() => {
  //   console.log(incomeTransactionSet.map((transaction) => transaction.date));
  //   console.log(incomeTransactionSet.map((transaction) => transaction.quarter));
  // console.log(
  //   incomeTransactionSet.filter((transaction) => transaction.quarter === 2)
  // );
  // }, [incomeTransactionSet]);

  // useEffect(() => {
  //   console.log(incomeTransactionSet.map((transaction) => transaction.type));
  // }, [incomeTransactionSet]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < expenseTransactionSet.length; i++) {
      sum += parseFloat(expenseTransactionSet[i].amount);
    }
    setTotalExpenses(sum);
  }, [expenseTransactionSet]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < incomeTransactionSet.length; i++) {
      sum += parseFloat(incomeTransactionSet[i].amount);
    }
    setTotalIncome(sum);
  }, [incomeTransactionSet]);

  useEffect(() => {
    if (expenseTransactionSet.length > 0) {
      setTotalTransactions((prevTotalTransactions) => [
        ...prevTotalTransactions,
        { ...expenseTransactions, className: "recentExpenseCard" },
      ]);
    }
  }, [expenseTransactionSet]);

  useEffect(() => {
    if (incomeTransactionSet.length > 0) {
      setTotalTransactions((prevTotalTransactions) => [
        ...prevTotalTransactions,
        { ...incomeTransactions, className: "recentIncomeCard" },
      ]);
    }
  }, [incomeTransactionSet]);

  useEffect(() => {
    if (totalTransactions.length > 0) {
      console.log(totalTransactions);
    }
  }, [totalTransactions]);

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
        quarter: quarter,
        type: "expense",
      });
    } else if (expense === "income") {
      let splitDate = incomeTransactions.date.split("-");

      let month = parseInt(splitDate[1], 10);

      setQuarter(Math.ceil(month / 3));

      setIncomeTransactionsSet([...incomeTransactionSet, incomeTransactions]);
      setIncomeTransactions({
        name: incomeTransactions.name,
        amount: incomeTransactions.amount,
        date: incomeTransactions.date,
        description: incomeTransactions.description,
        quarter: quarter,
        type: "income",
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

  const quarterBalanceData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Income",
        data: [
          incomeTransactionSet
            .filter((transaction) => transaction.quarter === 1)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          incomeTransactionSet
            .filter((transaction) => transaction.quarter === 2)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          incomeTransactionSet
            .filter((transaction) => transaction.quarter === 3)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          incomeTransactionSet
            .filter((transaction) => transaction.quarter === 4)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),
        ],
        backgroundColor: "#ffde59",
        borderColor: "#f1c40f",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: [
          expenseTransactionSet
            .filter((transaction) => transaction.quarter === 1)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          expenseTransactionSet
            .filter((transaction) => transaction.quarter === 2)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          expenseTransactionSet
            .filter((transaction) => transaction.quarter === 3)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),

          expenseTransactionSet
            .filter((transaction) => transaction.quarter === 4)
            .map((transaction) => transaction.amount)
            .reduce((acm, crv) => acm + crv, 0),
        ],
        backgroundColor: "#41d5d1",
        borderColor: "#1abc9c",
        borderWidth: 1,
      },
    ],
  };

  const incomeData = {
    labels: incomeTransactionSet.map((transaction) => transaction.name),
    datasets: [
      {
        data: incomeTransactionSet.map((transaction) => transaction.amount),
        backgroundColor: [
          "#6ce5e8",
          "#41b8d5",
          "#2d8bba",
          "#2f5f98",
          "#31356e",
        ],
        hoverBackgroundColor: [
          "#6ce5e8",
          "#41b8d5",
          "#2d8bba",
          "#2f5f98",
          "#31356e",
        ],
        borderColor: "#000",
        borderWidth: 0.3,
        hoverBorderColor: "#000",
        hoverBorderWidth: 2,
        offset: 0,
        spacing: 0,
        weight: 1,
        animation: {
          duration: 1000,
        },
      },
    ],
  };
  const expenseData = {
    labels: expenseTransactionSet.map((transaction) => transaction.name),
    datasets: [
      {
        data: expenseTransactionSet.map((transaction) => transaction.amount),
        backgroundColor: [
          "#6ce5e8",
          "#41b8d5",
          "#2d8bba",
          "#2f5f98",
          "#31356e",
        ],
        hoverBackgroundColor: [
          "#6ce5e8",
          "#41b8d5",
          "#2d8bba",
          "#2f5f98",
          "#31356e",
        ],
        borderColor: "#000",
        borderWidth: 0.3,
        hoverBorderColor: "#000",
        hoverBorderWidth: 2,
        offset: 0,
        spacing: 0,
        weight: 1,
        animation: {
          duration: 1000,
        },
      },
    ],
  };

  const balanceData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#ffde59", "#41d5d1"],
        borderRadius: 7,
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
          <button
            className={toggleButtonClass(4)}
            onClick={() => {
              setView("goals");
              handleButtonClick(4);
            }}
          >
            Add Goals
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
                <div className="expenses">
                  <div className="expenseTransactions">
                    <p className="transactionHeader">Expense Transactions</p>
                    <div className="expenseLists">
                      {expenseTransactionSet.map((transaction, index) => (
                        <div key={index} className="expenseCard">
                          <span className="material-symbols-outlined">
                            savings
                          </span>
                          <div className="circle"></div>
                          <p className="transactionName">{transaction.name}</p>
                          <div className="transactionDetails">
                            <p className="transactionAmount">
                              <span className="details">
                                ${transaction.amount}
                              </span>
                            </p>
                            <p className="transactionDate">
                              <span className="material-symbols-outlined detailsIcon">
                                calendar_month
                              </span>
                              <span className="details">
                                {transaction.date}
                              </span>
                            </p>
                            <p className="transactionDescription">
                              <span className="material-symbols-outlined detailsIcon">
                                description
                              </span>
                              <span className="details">
                                {transaction.description}
                              </span>
                            </p>
                          </div>
                          <span
                            className="material-symbols-outlined deleteIcon detailsIcon"
                            onClick={() => handleDelete(index, "expense")}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="expenseGraph">
                    <Doughnut
                      data={expenseData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            onClick: (e) => e.stopPropagation(),
                            labels: {
                              color: "white",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {view === "income" && (
            <>
              <div className="expenseForm">
                <div className="formDiv">
                  <div className="formTitle">Income</div>
                  <form
                    className="addExpense"
                    onSubmit={(e) => handleSubmit(e, "income")}
                  >
                    <div className="formValue">
                      Total Income:{" "}
                      <span className="formPrice">${totalIncome}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      name="name"
                      onChange={(e) => handleChange(e, "income")}
                      value={incomeTransactions.name}
                      autoComplete="off"
                    ></input>
                    <input
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      onChange={(e) => handleChange(e, "income")}
                      value={incomeTransactions.amount}
                    ></input>
                    <input
                      type="date"
                      placeholder="Date"
                      name="date"
                      onChange={(e) => handleChange(e, "income")}
                      value={incomeTransactions.date}
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
                      value={incomeTransactions.description}
                    ></input>
                    <button type="submit" className="submitBtn">
                      + Add Expense
                    </button>
                  </form>
                </div>
                <div className="expenses">
                  <div className="expenseTransactions">
                    <p className="transactionHeader">Income Transactions</p>
                    <div className="expenseLists">
                      {incomeTransactionSet.map((transaction, index) => (
                        <div key={index} className="expenseCard">
                          <span className="material-symbols-outlined">
                            savings
                          </span>
                          <div className="circle"></div>
                          <p className="transactionName">{transaction.name}</p>
                          <div className="transactionDetails">
                            <p className="transactionAmount">
                              <span className="details">
                                ${transaction.amount}
                              </span>
                            </p>
                            <p className="transactionDate">
                              <span className="material-symbols-outlined detailsIcon">
                                calendar_month
                              </span>
                              <span className="details">
                                {transaction.date}
                              </span>
                            </p>
                            <p className="transactionDescription">
                              <span className="material-symbols-outlined detailsIcon">
                                description
                              </span>
                              <span className="details">
                                {transaction.description}
                              </span>
                            </p>
                          </div>
                          <span
                            className="material-symbols-outlined deleteIcon detailsIcon"
                            onClick={() => handleDelete(index, "income")}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="expenseGraph">
                    <Doughnut
                      data={incomeData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            onClick: (e) => e.stopPropagation(),
                            labels: {
                              color: "white",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {view === "dashboard" && (
            <>
              <div className="dashboardLeft">
                <div className="myBalance">
                  <div className="myBalanceTitle">My Balance</div>
                  <div className="myBalanceValues">
                    <div className="myBalanceValue">${balance}</div>
                    <div className="myBalanceGraph">
                      <Bar
                        data={balanceData}
                        options={{
                          indexAxis: "y",
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              ticks: {
                                font: {
                                  size: 12,
                                  family: "Roboto",
                                  weight: 200,
                                },
                                color: "white",
                              },
                              grid: {
                                display: false,
                                drawBorder: false,
                              },
                            },
                            y: {
                              ticks: {
                                font: {
                                  size: 12,
                                  family: "Roboto",
                                  weight: 300,
                                },
                                color: "white",
                              },
                              grid: {
                                display: false,
                                drawBorder: false,
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="cashFlowTitle">Cashflow</div>
                <div className="cashflow">
                  <div className="quarterBalanceGraph"></div>
                  <Bar data={quarterBalanceData} />
                </div>
              </div>

              <div className="dashboardRight">
                <div className="recentTransactions">
                  <div className="myBalanceTitle">Recent Transactions</div>
                  <div className="recentTransactionList">
                    {totalTransactions.map((transaction, index) => (
                      <div className={transaction.className} key={index}>
                        <div className="recentCard">
                          <span className="recentName">{transaction.name}</span>
                          <span className="recentAmount">
                            {transaction.type === "expense"
                              ? `- ${transaction.amount}`
                              : `+ ${transaction.amount}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
