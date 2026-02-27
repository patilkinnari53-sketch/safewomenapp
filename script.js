// SHOW SCREENS
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// REGISTER
function register() {
  let user = regUser.value;
  let pass = regPass.value;

  if (user === "" || pass === "") {
    regError.innerText = "All fields required!";
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  alert("Registration Successful!");
  showLogin();
}

// LOGIN
function login() {
  let u = loginUser.value;
  let p = loginPass.value;

  if (u === localStorage.getItem("user") &&
      p === localStorage.getItem("pass")) {

    loginBox.style.display = "none";
    dashboard.style.display = "block";
  } else {
    loginError.innerText = "Invalid Username or Password!";
  }
}

// LOGOUT
function logout() {
  dashboard.style.display = "none";
  loginBox.style.display = "block";
}

// SOS
function sos() {
  alert("🚨 SOS Sent to Emergency Contacts!");
}

// LIVE LOCATION
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      output.innerHTML =
        "Latitude: " + pos.coords.latitude +
        "<br>Longitude: " + pos.coords.longitude;
    });
  } else {
    output.innerText = "Location not supported!";
  }
}

function showDefense() {
  output.innerHTML = `
    <h3>🥋 Self Defense Techniques (10 Steps)</h3>
    <ol>
      <li>
        <b>Stay Alert</b><br>
        Always be aware of your surroundings. Avoid distractions like using your phone while walking alone.
      </li>

      <li>
        <b>Trust Your Instincts</b><br>
        If something feels wrong, leave immediately. Your instincts are your first protection.
      </li>

      <li>
        <b>Use a Loud Voice</b><br>
        Shout “HELP” or “STOP” loudly to attract attention and scare the attacker.
      </li>

      <li>
        <b>Target Sensitive Areas</b><br>
        Aim for eyes, nose, throat, groin, or knees — these areas weaken attackers quickly.
      </li>

      <li>
        <b>Carry Self-Defense Tools</b><br>
        Pepper spray, safety alarm, or a whistle can help you escape dangerous situations.
      </li>

      <li>
        <b>Break Free Techniques</b><br>
        If grabbed, twist your wrist toward the attacker’s thumb and pull away strongly.
      </li>

      <li>
        <b>Maintain Safe Distance</b><br>
        Keep at least one arm’s distance from strangers whenever possible.
      </li>

      <li>
        <b>Learn Basic Martial Arts</b><br>
        Training like Karate, Taekwondo, or Judo builds confidence and strength.
      </li>

      <li>
        <b>Use Everyday Objects</b><br>
        Keys, bags, water bottles can be used to defend yourself in emergencies.
      </li>

      <li>
        <b>Escape & Seek Help</b><br>
        After defending yourself, run to a crowded or well-lit place and call emergency services.
      </li>
    </ol>
  `;
}
