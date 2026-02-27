function showRegister() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

function showLogin() {
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

function register() {
  const user = document.getElementById("regUsername").value;
  const pass = document.getElementById("regPassword").value;
  const error = document.getElementById("registerError");

  if (user === "" || pass === "") {
    error.innerText = "All fields required!";
    return;
  }

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("Registration Successful!");
  showLogin();
}

function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  if (
    user === localStorage.getItem("username") &&
    pass === localStorage.getItem("password")
  ) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
  } else {
    error.innerText = "Invalid Username or Password!";
  }
}

function logout() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}
