document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Hardcoded credentials
    const correctUsername = "admin";
    const correctPassword = "admin123";

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate login
    if (username === correctUsername && password === correctPassword) {
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome, Admin!",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "home.html"; // Redirect to dashboard
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid username or password. Please try again.",
        });
    }
});
