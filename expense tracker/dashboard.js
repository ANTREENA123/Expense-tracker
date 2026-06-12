let chart;
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let balanceEl = document.getElementById("balance");
let dailyEl = document.getElementById("daily");
let monthlyEl = document.getElementById("monthly");
let yearlyEl = document.getElementById("yearly");
let listEl = document.getElementById("list");

render();

document.getElementById("add-btn").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let desc = document.getElementById("desc").value;
    let amount = Number(document.getElementById("amount").value);
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;

    if (name === "" || desc === "" || amount === 0 || date === "") {
        alert("Please fill all fields");
        return;
    }

    let transaction = { name, desc, amount, date, type };
    transactions.push(transaction);

    saveData();
    render();

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
});

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(index) {
    if (confirm("Are you sure you want to delete this transaction?")) {
        transactions.splice(index, 1);
        saveData();
        render();
    }
}

function render() {
    listEl.innerHTML = "";

    let balance = 0;
    let daily = 0;
    let monthly = 0;
    let yearly = 0;

    let today = new Date().toISOString().slice(0, 10);
    let currentMonth = today.slice(0, 7);
    let currentYear = today.slice(0, 4);

    for (let i = 0; i < transactions.length; i++) {
        let item = transactions[i];
        let sign = item.type === "income" ? "+" : "-";
        let icon = item.type === "income" ? "fa-arrow-trend-up" : "fa-arrow-trend-down";
        let colorClass = item.type === "income" ? "income" : "expense";

        let li = document.createElement("li");
        li.className = "tx-item";
        li.innerHTML = `
            <div class="tx-info">
                <div class="tx-icon ${colorClass}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="tx-details">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
            <div class="tx-amount">
                <span class="amount-val ${colorClass}">${sign}₹${item.amount}</span>
                <p class="subtitle" style="font-size: 11px;">${item.date}</p>
                <div class="tx-actions">
                    <button onclick="deleteTransaction(${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;

        listEl.appendChild(li);

        if (item.type === "income") {
            balance += item.amount;
        } else {
            balance -= item.amount;

            if (item.date === today) {
                daily += item.amount;
            }

            if (item.date.slice(0, 7) === currentMonth) {
                monthly += item.amount;
            }

            if (item.date.slice(0, 4) === currentYear) {
                yearly += item.amount;
            }
        }
    }

    balanceEl.textContent = balance;
    dailyEl.textContent = daily;
    monthlyEl.textContent = monthly;
    yearlyEl.textContent = yearly;

    drawChart();
}

function drawChart() {
    let income = 0;
    let expense = 0;

    for (let item of transactions) {
        if (item.type === "income") {
            income += item.amount;
        } else {
            expense += item.amount;
        }
    }

    let ctx = document.getElementById("expenseChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ["#10b981", "#f43f5e"],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 14
                        },
                        padding: 20
                    }
                }
            },
            cutout: '75%'
        }
    });
}
drawChart();