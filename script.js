function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (username === "" || password === "") {
    error.textContent = "⚠ Please fill all fields";
    return;
  }

    // SHOW DASHBOARD AFTER LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (username === "admin" && password === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
  } else {
    error.textContent = "❌ Invalid Username or Password!";
  }
}

// LOGOUT
function logout() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// SWITCH SECTIONS
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// LIVE LOCATION (FREE)
function getLocation() {
  const output = document.getElementById("locationOutput");

  if (!navigator.geolocation) {
    output.textContent = "Geolocation not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      output.innerHTML = `
        Latitude: ${lat} <br>
        Longitude: ${lon} <br>
        <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">
          View on Google Maps
        </a>
      `;
    },
    () => {
      output.textContent = "Unable to fetch location";
    }
  );
}

function register() {
  alert("Registration feature coming soon!");
}

  // Demo credentials (for project)
  if (username === "admin" && password === "1234") {
    error.style.color = "#4ade80";
    error.textContent = "✅ Login Successful!";
    
    setTimeout(() => {
      alert("Welcome to Safe Women App!");
      // window.location.href = "dashboard.html"; // optional
    }, 800);
  } else {
    error.style.color = "#ff6b6b";
    error.textContent = "❌ Invalid Username or Password!";
  }
}

function register() {
  alert("Registration feature coming soon!");
}
