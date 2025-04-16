       // dropdown
       function toggleDropdown(id, icon) {
        var dropdown = document.getElementById(id);
        var iconElement = icon.querySelector("ion-icon");
        var isVisible = dropdown.style.display === "flex";
        dropdown.style.display = isVisible ? "none" : "flex";
        iconElement.style.transform = isVisible ? "rotate(0deg)" : "rotate(90deg)";
    }
    
    document.getElementById("enrollment").addEventListener("click", function(event) {
        event.preventDefault();  
        event.stopPropagation();  
        toggleDropdown("enrollmentDropdown", this);  
    });
    
    document.getElementById("changeWire").addEventListener("click", function(event) {
        event.preventDefault(); 
        event.stopPropagation();  
        toggleDropdown("changeWireDropdown", this); 
    });

    // DROPDOWN FOR CHANGE WIRE
    document.querySelectorAll("#changeWireDropdown li").forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault();  

            
            const contentId = this.getAttribute("data-content");

            // CHANGE WIRE DROPDOWN
            if (contentId === "bts1-content") {
                window.location.href = "#";  // bts1
            } else if (contentId === "bts2-content") {
                window.location.href = "#";  // bts2
            } else if (contentId === "senior-high-content") {
                window.location.href = "#";  // shs
            } else {
                
                showContent(contentId);
            }
        });
    });

    function showContent(contentId) {
        const allContentSections = document.querySelectorAll('.main-content > .content');
        allContentSections.forEach(section => {
            section.style.display = 'none';  
        });

        const contentToShow = document.querySelector(`.${contentId}`);
        if (contentToShow) {
            contentToShow.style.display = 'block';  
        }
    }

    document.querySelectorAll(".sidebar ul li").forEach(item => {
        if (!item.id || (item.id !== "enrollment" && item.id !== "changeWire")) {
            item.addEventListener("click", function(event) {
                event.stopPropagation();

                const contentId = this.getAttribute("data-content");
                showContent(contentId);
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        showContent("dashboard-content");
    });

    // theme
    document.addEventListener("DOMContentLoaded", function () {
const themeToggle = document.getElementById("theme-toggle");


const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark-mode", savedTheme === "dark");
themeToggle.checked = savedTheme === "dark";


themeToggle.addEventListener("change", function () {
    const selectedTheme = themeToggle.checked ? "dark" : "light";
    document.body.classList.toggle("dark-mode", selectedTheme === "dark");
    localStorage.setItem("theme", selectedTheme);
});
});


    //settings sidebar
    document.querySelectorAll(".settings-sidebar li").forEach(item => {
        item.addEventListener("click", function() {
            document.querySelectorAll(".settings-section").forEach(section => {
                section.classList.add("hidden");
        });
        document.getElementById(this.getAttribute("data-section")).classList.remove("hidden");
    });
});

//security password field
function togglePassword(fieldId, icon) {
    var passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.setAttribute("name", "eye-outline"); // Open eye
    } else {
        passwordField.type = "password";
        icon.setAttribute("name", "eye-off-outline"); // Closed eye
    }
}