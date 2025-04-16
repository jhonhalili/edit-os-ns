const programsOS = ["ASCT", "ART", "BSTRCS", "ABCOMARTS", "BMMA", "BSA", "BSAIS", "BSCOE", "BSCS", "BSHM", "BSIS", "BSIT", "BSMA", "BSOA"];

function createTable() {
    const tbody = document.getElementById("table-body-os");
    programsOS.forEach((program, pIndex) => {
        const row = document.createElement("tr");
        let cells = `<td>${program}</td>`;
        for (let q = 1; q <= 4; q++) {
            cells += `<td><input type='number' id='${program}-q${q}-reg' min='0' value='0' readonly oninput='updateTotal()'></td>`;
            cells += `<td><input type='number' id='${program}-q${q}-enr' min='0' value='0' readonly oninput='updateTotal()'></td>`;

        }
        row.innerHTML = cells;
        tbody.appendChild(row);
    });
    updateTotal();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll("#table-body-os input[type='number']").forEach(input => {
        total += parseInt(input.value) || 0;
    });
    document.getElementById("total-count").innerText = total;
    saveOSToLocalStorage();
}

function editTable() {
    document.querySelectorAll("#table-body-os input").forEach(input => {
        input.removeAttribute("readonly");
        input.classList.add("editing");
    });
}


function saveChanges() {
    document.querySelectorAll("#table-body-os input").forEach(input => {
        input.setAttribute("readonly", true);
        input.classList.remove("editing");
    });
}


function updateDateOS() {
    const date = new Date();
    const option2 = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("current-date-os").innerText = date.toLocaleString('en-US', option2);
}

function saveOSToLocalStorage() {
    const data = {};
    programsOS.forEach(program => {
        data[program] = {};
        for (let q = 1; q <= 4; q++) {
            data[program][`q${q}`] = {
                reg: parseInt(document.getElementById(`${program}-q${q}-reg`).value) || 0,
                enr: parseInt(document.getElementById(`${program}-q${q}-enr`).value) || 0
            };
        }
    });
    localStorage.setItem("enrollmentData", JSON.stringify(data));
}

const programsNS = [
    "Associate in Computer Technology",
    "Associate in Retail Technology",
    "Bachelor of Science in Retail Technology and Consumer Science",
    "Bachelor of Arts in Communication",
    "Bachelor of Multimedia Arts",
    "Bachelor of Science in Accountancy",
    "Bachelor of Science in Accounting Information System",
    "Bachelor of Science in Computer Engineering",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Hospitality Management",
    "Bachelor of Science in Information Systems",
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Management Accounting",
    "Bachelor of Science in Office Administration"
];

function updateDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date-ns').textContent = today.toLocaleDateString('en-US', options);
}

function loadPrograms() {
    const table = document.getElementById("programTableNS");
    table.innerHTML = "";
    programsNS.forEach((program) => {
        const safeId = program.replace(/\s+/g, '-').toLowerCase();
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${program}</td>
            <td><input type="number" id="${safeId}-online" class="online-inquirer" value="0" readonly oninput="calculateTotals()"></td>
            <td><input type="number" id="${safeId}-inquirer" class="inquirer" value="0" readonly oninput="calculateTotals()"></td>
            <td><input type="number" id="${safeId}-registration" class="registration" value="0" readonly oninput="calculateTotals()"></td>
            <td><input type="number" id="${safeId}-enrollee" class="enrollee" value="0" readonly oninput="calculateTotals()"></td>
        `;
        table.appendChild(row);
    });
    calculateTotals();
}

function editNSTable(){
    document.querySelectorAll("#programTableNS input").forEach(input => {
        input.removeAttribute("readonly");
        input.classList.add("editing");
    });
}

function calculateTotals() {
    let totalOnline = 0, totalInquirer = 0, totalRegistration = 0, totalEnrollee = 0;
    document.querySelectorAll("#programTableNS tr").forEach(row => {
        totalOnline += parseInt(row.querySelector(".online-inquirer").value) || 0;
        totalInquirer += parseInt(row.querySelector(".inquirer").value) || 0;
        totalRegistration += parseInt(row.querySelector(".registration").value) || 0;
        totalEnrollee += parseInt(row.querySelector(".enrollee").value) || 0;
    });
    document.getElementById('totalOnlineInquirer').textContent = totalOnline;
    document.getElementById('totalInquirer').textContent = totalInquirer;
    document.getElementById('totalRegistration').textContent = totalRegistration;
    document.getElementById('totalEnrollee').textContent = totalEnrollee;
    
    saveNSToLocalStorage();
}

function saveNSToLocalStorage() {
    const data = {};
    programsNS.forEach(program => {
        const safeId = program.replace(/\s+/g, '-').toLowerCase();
        data[program] = {
            online: parseInt(document.getElementById(`${safeId}-online`).value) || 0,
            inquirer: parseInt(document.getElementById(`${safeId}-inquirer`).value) || 0,
            registration: parseInt(document.getElementById(`${safeId}-registration`).value) || 0,
            enrollee: parseInt(document.getElementById(`${safeId}-enrollee`).value) || 0
        };
    });
    localStorage.setItem("inquiryData", JSON.stringify(data));
}

function saveNSChanges(){
    document.querySelectorAll("#programTableNS input").forEach(input => {
        input.setAttribute("readonly", true);
        input.classList.remove("editing");
    });
}

function saveData() {
    if (confirm("Are you sure you want to save?")) {
        alert("Data has been saved successfully!");
        document.getElementById("saveBtn").disabled = true;
    }
}

function editData() {
    alert("You can now edit the data.");
    document.getElementById("saveBtn").disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
    createTable();
    updateDateOS();
    setInterval(updateDateOS, 1000);
    updateDate();
    loadPrograms();
    setInterval(updateDate, 1000);
});
