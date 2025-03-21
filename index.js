document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const correctUsername = "admin";
    const correctPassword = "admin123";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === correctUsername && password === correctPassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome, Admin!",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "home.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid username or password. Please try again.",
        });
    }
});
