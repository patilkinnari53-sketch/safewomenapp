/* ============ SafeHer — Global Theme + Helpers + Animations ============ */

(function applyStoredTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.documentElement.classList.add('dark-loading');
})();

function createParticles() {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = i % 2 === 0
      ? 'rgba(123,31,162,0.35)' : 'rgba(233,30,99,0.35)';
    p.style.animationDuration = (Math.random() * 20 + 20) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    document.body.appendChild(p);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.body.classList.add('dark');
  document.documentElement.classList.remove('dark-loading');
  updateThemeButton();
  createParticles();
});

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeButton();
  toast(isDark ? '🌙 Dark mode' : '☀️ Light mode');
}

function updateThemeButton() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const isDark = document.body.classList.contains('dark');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

const DB = {
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (u) => localStorage.setItem('user', JSON.stringify(u)),
  logout: () => localStorage.removeItem('user'),
  getContacts: () => JSON.parse(localStorage.getItem('contacts') || '[]'),
  setContacts: (c) => localStorage.setItem('contacts', JSON.stringify(c)),
  getAlerts: () => JSON.parse(localStorage.getItem('alerts') || '[]'),
  setAlerts: (a) => localStorage.setItem('alerts', JSON.stringify(a)),
};

function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

function guardAuth(redirect = 'login.html') {
  if (!DB.getUser()) { location.href = redirect; return false; }
  return true;
}

function logout() {
  DB.logout();
  toast('Logged out');
  setTimeout(() => location.href = 'index.html', 700);
}

function renderAuthLink() {
  const el = document.getElementById('authLink');
  if (!el) return;
  if (DB.getUser()) {
    el.innerHTML = '<button class="btn-logout" onclick="logout()">Logout</button>';
  } else {
    el.innerHTML = '<a href="login.html">Login</a>';
  }
}
document.addEventListener('DOMContentLoaded', renderAuthLink);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')) return;
      e.preventDefault();
      document.querySelector('.page')?.classList.add('page-exit');
      document.body.style.transition = 'opacity 0.3s';
      document.body.style.opacity = '0';
      setTimeout(() => location.href = href, 280);
    });
  });
});

/* ============ SOS with Countdown ============ */
let sosTimer = null;
let sosCountdownValue = 5;

function startSOS() {
  let overlay = document.getElementById('sosOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sosOverlay';
    overlay.className = 'sos-countdown';
    overlay.innerHTML = `
      <h2>🚨 Sending SOS in</h2>
      <div class="number" id="sosNumber">5</div>
      <p style="font-size:18px">Your location will be shared with your emergency contacts.</p>
      <button class="sos-cancel" onclick="cancelSOS()">✖ CANCEL</button>
    `;
    document.body.appendChild(overlay);
  }
  sosCountdownValue = 5;
  document.getElementById('sosNumber').textContent = sosCountdownValue;
  overlay.classList.add('active');

  sosTimer = setInterval(() => {
    sosCountdownValue--;
    const el = document.getElementById('sosNumber');
    if (el) el.textContent = sosCountdownValue;
    if (sosCountdownValue <= 0) {
      clearInterval(sosTimer);
      sosTimer = null;
      sendSOSAlert();
    }
  }, 1000);
}

function cancelSOS() {
  if (sosTimer) { clearInterval(sosTimer); sosTimer = null; }
  const overlay = document.getElementById('sosOverlay');
  if (overlay) overlay.classList.remove('active');
  toast('❌ SOS cancelled');
}

function sendSOSAlert() {
  const overlay = document.getElementById('sosOverlay');
  if (overlay) overlay.classList.remove('active');

  if (!navigator.geolocation) return toast('❌ Geolocation not supported');
  const user = DB.getUser();
  if (!user) { location.href = 'login.html'; return; }

  toast('📡 Getting your location...');

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const alerts = DB.getAlerts();
      alerts.unshift({
        id: Date.now(),
        message: `🚨 EMERGENCY! ${user.fullName} needs help!`,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      });
      DB.setAlerts(alerts);
      const contacts = DB.getContacts();
      toast(`✅ SOS sent to ${contacts.length} contacts!`);

      const statusEl = document.getElementById('sosStatus');
      if (statusEl) {
        statusEl.textContent = '✅ SOS Alert sent! Your contacts have been notified.';
        statusEl.style.color = 'green';
      }
      if (typeof refreshStats === 'function') refreshStats();
    },
    () => {
      toast('❌ Location access denied');
      const statusEl = document.getElementById('sosStatus');
      if (statusEl) {
        statusEl.textContent = '❌ Location access denied. Enable it to send alerts.';
        statusEl.style.color = 'red';
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}
