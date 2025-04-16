document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordLink = document.getElementById("forgot-password");
    const loginForm = document.getElementById("login-form");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const loginLeft = document.querySelector(".login-left");
    const loginRight = document.querySelector(".login-right");
    const backToLoginLinks = document.querySelectorAll(".back-to-login");
    const loginButton = document.querySelector(".login-now");
    const resetPasswordButton = document.getElementById("forgot-password-button");

    const emailInput = document.querySelector("#login-form input[type='email']");
    const passwordInput = document.querySelector("#login-form input[type='password']");
    const forgotPasswordEmail = document.querySelector("#forgot-password-form input[type='email']");
    const newPasswordInput = document.querySelector("#forgot-password-form input[name='new-password']");
    const confirmPasswordInput = document.querySelector("#forgot-password-form input[name='confirm-password']");

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("p");
            error.classList.add("error-message");
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.style.border = "1px solid red";
    }

    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.textContent = "";
        }
        input.style.border = "1px solid #ddd";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function resetAllForms() {
        loginForm.style.display = "block";
        forgotPasswordForm.style.display = "none";
        loginLeft.classList.remove("move-illustration");
        loginRight.classList.remove("move-form");
    }

    function transitionToForgotPassword() {
        resetAllForms();
        loginLeft.classList.add("move-illustration");
        loginRight.classList.add("move-form");

        setTimeout(() => {
            loginForm.style.display = "none";
            forgotPasswordForm.style.display = "block";
        }, 300);
    }

    function transitionToLoginForm() {
        loginLeft.classList.remove("move-illustration");
        loginRight.classList.remove("move-form");

        setTimeout(() => {
            forgotPasswordForm.style.display = "none";
            loginForm.style.display = "block";
        }, 300);
    }

    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();
        transitionToForgotPassword();
    });

    backToLoginLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            transitionToLoginForm();
        });
    });

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        let valid = true;

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required.");
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Invalid email format.");
            valid = false;
        } else {
            clearError(emailInput);
        }

        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password is required.");
            valid = false;
        } else {
            clearError(passwordInput);
        }

        if (!valid) return;

    });

    resetPasswordButton.addEventListener("click", function (event) {
        event.preventDefault();

        let valid = true;

        if (forgotPasswordEmail.value.trim() === "") {
            showError(forgotPasswordEmail, "Email is required.");
            valid = false;
        } else if (!isValidEmail(forgotPasswordEmail.value.trim())) {
            showError(forgotPasswordEmail, "Invalid email format.");
            valid = false;
        } else {
            clearError(forgotPasswordEmail);
        }

        if (newPasswordInput.value.trim() === "") {
            showError(newPasswordInput, "New password is required.");
            valid = false;
        } else {
            clearError(newPasswordInput);
        }

        if (confirmPasswordInput.value.trim() === "") {
            showError(confirmPasswordInput, "Confirm password is required.");
            valid = false;
        } else {
            clearError(confirmPasswordInput);
        }

        if (newPasswordInput.value.trim() !== confirmPasswordInput.value.trim()) {
            showError(confirmPasswordInput, "Passwords do not match.");
            valid = false;
        }

        if (!valid) return;

        transitionToLoginForm();
    });

    resetAllForms();


    const carouselItems = document.querySelectorAll("#backgroundCarousel .carousel-item");
    let currentIndex = 0;
    const intervalTime = 8000; 

    function showNextSlide() {
        carouselItems[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselItems[currentIndex].classList.add("active");
    }

    if (carouselItems.length > 0) {
        carouselItems[0].classList.add("active");
        setInterval(showNextSlide, intervalTime);
    }


    const illustrations = document.querySelectorAll(".illustration");
    let illustrationIndex = 0;

    function showNextIllustration() {
        illustrations[illustrationIndex].classList.remove("active");
        illustrationIndex = (illustrationIndex + 1) % illustrations.length;
        illustrations[illustrationIndex].classList.add("active");
    }

    if (illustrations.length > 0) {
        illustrations[0].classList.add("active");
        setInterval(showNextIllustration, 5000);
    }
});
