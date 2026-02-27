// ================= PAGE NAVIGATION FUNCTION =================
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// Show login page by default
showPage('login');

// ================= REGISTER FUNCTION =================
function register() {
    // Store user credentials locally
    localStorage.setItem("user", regUser.value);
    localStorage.setItem("pass", regPass.value);

    alert("Registration Successful!");
    showPage('login');
}

// ================= LOGIN FUNCTION =================
function login() {
    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if (!storedUser || !storedPass) {
        alert("No account found. Please register first!");
        showPage('register');
        return;
    }

    if (loginUser.value === storedUser && loginPass.value === storedPass) {
        showPage('dashboard');
    } else {
        alert("Invalid Username or Password!");
    }
}

// ================= LOGOUT FUNCTION =================
function logout() {
    showPage('login');
}

// ================= SOS FUNCTION =================
function sendSOS() {
    alert("🚨 SOS Alert Sent to Emergency Contact!");
    getLocation();
}

// ================= LOCATION FUNCTION =================
function getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        location.innerText =
            "📍 Latitude: " + position.coords.latitude +
            " | Longitude: " + position.coords.longitude;
    });
}

// ================= CONTACT FUNCTIONS =================
function saveContact() {
    localStorage.setItem("contactName", contactName.value);
    localStorage.setItem("contactNumber", contactNumber.value);

    savedContact.innerText = "Saved Contact: " + contactName.value;
}

function callContact() {
    alert("Calling " + localStorage.getItem("contactName"));
}

function sendSMS() {
    alert("Emergency SMS Sent Successfully!");
}

// ================= INCIDENT REPORT =================
function saveReport() {
    localStorage.setItem("incidentReport", incidentText.value);
    alert("Incident Report Saved!");
}