/* ============ SafeHer — Global Theme + Header/Footer Loader ============ */

(function applyStoredTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.documentElement.classList.add('dark-loading');
})();

/* ============ Cache-busting fetch ============ */
async function fetchFresh(url) {
  // Add timestamp so browser never uses cached version
  const sep = url.includes('?') ? '&' : '?';
  const fresh = `${url}${sep}v=${Date.now()}`;
  const res = await fetch(fresh, { cache: 'no-store' });
  return await res.text();
}

/* ============ Load Header & Footer ============ */
async function loadPartials() {
  const navContainer = document.getElementById('nav-placeholder');
  const footerContainer = document.getElementById('footer-placeholder');

  try {
    if (navContainer) {
      navContainer.innerHTML = await fetchFresh('header.html');
    }
  } catch (e) {
    console.error('❌ Failed to load header.html:', e);
    if (navContainer) navContainer.innerHTML = '<p style="padding:14px;text-align:center;color:#E91E63">Header failed to load</p>';
  }

  try {
    if (footerContainer) {
      footerContainer.innerHTML = await fetchFresh('footer.html');
      // Re-run inline scripts inside footer
      footerContainer.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
      });
    }
  } catch (e) {
    console.error('❌ Failed to load footer.html:', e);
    if (footerContainer) footerContainer.innerHTML = '<p style="padding:14px;text-align:center;color:#E91E63">Footer failed to load</p>';
  }

  applyThemeAndSetup();
}

/* ============ Setup After Header/Footer Load ============ */
function applyThemeAndSetup() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.body.classList.add('dark');
  document.documentElement.classList.remove('dark-loading');

  updateThemeButton();
  highlightActiveLink();
  renderAuthLink();
  createParticles();
  attachPageTransition();
  attachBackToTop();

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/* ============ Highlight Current Page ============ */
function highlightActiveLink() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'home',
    'dashboard.html': 'dashboard',
    'contacts.html': 'contacts',
    'location.html': 'location',
    'alerts.html': 'alerts',
    'profile.html': 'profile',
    'tips.html': 'tips',
    'about.html': 'about'
  };
  const page = map[path];
  if (!page) return;
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

/* ============ Particles ============ */
function createParticles() {
  if (document.querySelectorAll('.particle').length > 0) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = i % 2 === 0 ? 'rgba(123,31,162,0.35)' : 'rgba(233,30,99,0.35)';
    p.style.animationDuration = (Math.random() * 20 + 20) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    document.body.appendChild(p);
  }
}

/* ============ Page Transition ============ */
function attachPageTransition() {
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    if (a._transitionBound) return;
    a._transitionBound = true;
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')
        || href === 'header.html' || href === 'footer.html') return;
      e.preventDefault();
      document.querySelector('.page')?.classList.add('page-exit');
      document.body.style.transition = 'opacity 0.3s';
      document.body.style.opacity = '0';
      setTimeout(() => location.href = href, 280);
    });
  });
}

/* ============ Back-to-Top Button (auto-wire) ============ */
function attachBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  };
  window.removeEventListener('scroll', toggle);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============ Theme ============ */
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
}

/* ============ DB ============ */
const DB = {
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (u) => localStorage.setItem('user', JSON.stringify(u)),
  logout: () => localStorage.removeItem('user'),
  getContacts: () => JSON.parse(localStorage.getItem('contacts') || '[]'),
  setContacts: (c) => localStorage.setItem('contacts', JSON.stringify(c)),
  getAlerts: () => JSON.parse(localStorage.getItem('alerts') || '[]'),
  setAlerts: (a) => localStorage.setItem('alerts', JSON.stringify(a)),
};

/* ============ Toast ============ */
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

/* ============ Auth ============ */
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

/* ============ SOS ============ */
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

/* ============ Boot ============ */
document.addEventListener('DOMContentLoaded', () => {
  loadPartials();
});
