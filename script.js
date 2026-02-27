// LOGIN
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (u === "admin" && p === "1234") {
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

// SHOW SECTIONS
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// LIVE LOCATION
function getLocation() {
  const out = document.getElementById("locationOutput");

  if (!navigator.geolocation) {
    out.textContent = "Location not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      out.innerHTML = `
        Latitude: ${lat}<br>
        Longitude: ${lon}<br>
        <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">
          View on Map
        </a>`;
    },
    () => out.textContent = "Permission denied"
  );
}
