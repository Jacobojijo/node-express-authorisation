document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:4001/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    window.location.href = "login.html";
                } else {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            try {
                const response = await fetch("http://localhost:4001/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", username);
                    window.location.href = "delete-user.html";
                } else {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    }

    const deleteUserForm = document.getElementById("delete-user-form");
    if (deleteUserForm) {
        deleteUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("other-username").value;
            const token = localStorage.getItem("token");

            try {
                await fetch("http://localhost:4001/auth/delete/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ username }),
                });

                loadUserList(); // Refresh the user list
            } catch (error) {
                console.error("Error:", error);
            }
        });

        const loadUserList = async () => {
            const token = localStorage.getItem("token");
            const currentUsername = localStorage.getItem("username");

            try {
                const response = await fetch("http://localhost:4001/auth/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const users = await response.json();
                    const userList = document.getElementById("user-list");
                    userList.innerHTML = "";

                    users.forEach(user => {
                        if (user.username !== currentUsername) {
                            const li = document.createElement("li");
                            li.textContent = user.username;
                            li.addEventListener("click", () => {
                                document.getElementById("other-username").value = user.username;
                            });
                            userList.appendChild(li);
                        }
                    });
                } else {
                    const errorData = await response.json();
                    console.error("Error:", errorData.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        loadUserList();
    }
});
