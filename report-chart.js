document.addEventListener("DOMContentLoaded", function () {
    // --- Carousel ---
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const dotsContainer = document.querySelector(".carousel-dots");

    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function showSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        items.forEach((item, i) => {
            item.style.display = i === currentIndex ? "block" : "none";
        });
        updateDots();
    }

    document.querySelector(".carousel-prev").addEventListener("click", () => showSlide(currentIndex - 1));
    document.querySelector(".carousel-next").addEventListener("click", () => showSlide(currentIndex + 1));

    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => showSlide(i));
        dotsContainer.appendChild(dot);
    }

    showSlide(currentIndex);

    // --- Shared Data ---
    const programNames = [
        "Associate in Computer Technology", "Associate in Retail Technology", "BS Retail Tech & Consumer Science", 
        "BA Communication", "Bachelor of Multimedia Arts", "BS Accountancy", "BS Accounting Information System", 
        "BS Computer Engineering", "BS Computer Science", "BS Hospitality Management", "BS Information Systems", 
        "BS Information Technology", "BS Management Accounting", "BS Office Administration"
    ];

    const programCodes = [
        "ACT", "ART", "BSRCS", "BACOMM", "BAMMA", "BSA", "BSAIS",
        "BSCE", "BSCS", "BSHM", "BSIS", "BSIT", "BSMA", "BSOA"
    ];

    const programColors = [
        "#001F3F", "#008080", "#FF7F50", "#FFD700", "#800080", "#006400", "#50C878",
        "#4169E1", "#007FFF", "#800020", "#708090", "#87CEEB", "#228B22", "#800000"
    ];

    const yearData = {
        2024: Array(programCodes.length).fill(0),
        2025: Array(programCodes.length).fill(0),
        2026: Array(programCodes.length).fill(0),
        2027: Array(programCodes.length).fill(0)
    };

    // --- Slide 1: Donut Chart ---
    const donutCtx = document.getElementById("programChart").getContext("2d");
    new Chart(donutCtx, {
        type: "polarArea",
        data: {
            labels: programNames,
            datasets: [{
                data: yearData[2024], // default year
                backgroundColor: programColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "right" }
            }
        }
    });

    // --- Slide 2: Line Chart ---
    const yearSelector = document.getElementById("yearSelectorComparison");
    const lineCtx = document.getElementById("comparisonChart").getContext("2d");

    const comparisonChart = new Chart(lineCtx, {
        type: "line",
        data: {
            labels: programCodes,
            datasets: [{
                label: `Programs for ${yearSelector.value} Year`,
                data: yearData[yearSelector.value],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { bottom: 40 } },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        callback: function (value, index) {
                            return programCodes[index];
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            },
            plugins: {
                legend: { position: "top" }
            }
        }
    });

    yearSelector.addEventListener("change", function () {
        comparisonChart.data.datasets[0].data = yearData[this.value];
        comparisonChart.data.datasets[0].label = `Programs for ${this.value} Year`;
        comparisonChart.update();
    });

    // --- Slide 3: Top 5 Bar Chart ---
    const rankingCtx = document.getElementById("rankingChart").getContext("2d");
    const rankingYearSelector = document.getElementById("rankingYearSelector");

    const rankingChart = new Chart(rankingCtx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Top 5 Programs",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true } },
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.raw} students`;
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: "easeInOutCubic"
            }
        }
    });

    function updateRankingChart(year) {
        const data = yearData[year].map((value, index) => ({
            name: programCodes[index],
            value,
            color: programColors[index]
        }));
        const top5 = data.sort((a, b) => b.value - a.value).slice(0, 5);

        rankingChart.data.labels = top5.map(item => item.name);
        rankingChart.data.datasets[0].data = top5.map(item => item.value);
        rankingChart.data.datasets[0].backgroundColor = top5.map(item => item.color);
        rankingChart.data.datasets[0].borderColor = top5.map((item, i) => i === 0 ? "transparent" : item.color);
        rankingChart.data.datasets[0].borderWidth = top5.map((_, i) => i === 0 ? 3 : 1);

        rankingChart.update();
    }

    updateRankingChart(rankingYearSelector.value);
    rankingYearSelector.addEventListener("change", () => updateRankingChart(rankingYearSelector.value));
});
