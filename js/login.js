document.getElementById("login-form").onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const message = document.getElementById("login-message");

    // Demo credentials
    const demoEmail = "user@fashionhub.com";
    const demoPassword = "password123";

    if (email === demoEmail && password === demoPassword) {
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";
        localStorage.setItem("fashionhub_user", email);
        setTimeout(() => window.location.href = "index.html", 1200);
    } else {
        message.style.color = "#e75480";
        message.textContent = "Invalid email or password.";
    }
};