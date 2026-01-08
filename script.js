function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("login", "true");
        window.location = "dashboard.html";
    } else {
        document.getElementById("msg").innerText = "Invalid Login!";
    }
}

/* =============== PAGE PROTECTION =============== */

if (window.location.pathname.includes("dashboard")) {
    if (localStorage.getItem("login") !== "true") {
        window.location = "login.html";
    }
}

/* ================= ADD RECORD ================= */

function addRecord() {
    let name = document.getElementById("name").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (name === "" || amount <= 0) return;

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push({ name, amount, type });
    localStorage.setItem("records", JSON.stringify(records));

    showRecords();
}

/* ============ SHOW RECORDS & CALCULATION ============ */

function showRecords() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let records = JSON.parse(localStorage.getItem("records")) || [];
    let totalBill = 0;
    let totalDebt = 0;

    records.forEach(r => {
        let li = document.createElement("li");
        li.innerText = `${r.name} | Rs.${r.amount} | ${r.type}`;
        list.appendChild(li);

        if (r.type === "Bill") totalBill += r.amount;
        if (r.type === "Debt") totalDebt += r.amount;
    });

    document.getElementById("totalBill").innerText = totalBill;
    document.getElementById("totalDebt").innerText = totalDebt;
    document.getElementById("net").innerText = totalBill - totalDebt;
}

/* ================= LOGOUT ================= */

function logout() {
    localStorage.removeItem("login");
    window.location = "login.html";
}

if (window.location.pathname.includes("dashboard")) {
    showRecords();
}