// Get form and elements
const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const message = document.getElementById("message") as HTMLParagraphElement;

// Handle form submit
loginForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Simple validation
  if (username === "" || password === "") {
    message.textContent = "Please fill all fields.";
    message.style.color = "red";
    return;
  }

  // Dummy check (replace with API call)
  if (username === "admin" && password === "1234") {
    message.textContent = "Login successful!";
    message.style.color = "green";
  } else {
    message.textContent = "Invalid username or password.";
    message.style.color = "red";
  }
});
