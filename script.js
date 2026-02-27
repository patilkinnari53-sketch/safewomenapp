// SHOW SCREENS
function showRegister() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
}

function showLogin() {
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// REGISTER USER
function register() {
  const user = document.getElementById("regUsername").value;
  const pass = document.getElementById("regPassword").value;
  const error = document.getElementById("registerError");

  if (user === "" || pass === "") {
    error.textContent = "Please fill all fields";
    return;
  }

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("Registration Successful!");
  showLogin();
}

// LOGIN USER
function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;
  const error = document.getElementById("loginError");

  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (user === savedUser && pass === savedPass) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
  } else {
    error.textContent = "Invalid Username or Password!";
  }
}

// LOGOUT
function logout() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// SECTIONS
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// LIVE LOCATION
function getLocation() {
  const out = document.getElementById("locationOutput");

  navigator.geolocation.getCurrentPosition(
    pos => {
      out.innerHTML = `
        Lat: ${pos.coords.latitude}<br>
        Long: ${pos.coords.longitude}
      `;
    },
    () => out.textContent = "Location permission denied"
  );
}
