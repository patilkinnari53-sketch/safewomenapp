
# 🛡️ SafeHer — Women Safety Web Application

**SafeHer** is a **100% free, privacy-first, fully responsive** women safety web application designed to give every woman instant access to emergency help, trusted contacts, live location sharing, self-defense guidance, legal rights awareness, and national helplines — all in one beautifully animated interface.

It works **entirely in the browser** — no backend, no sign-up servers, no tracking, no ads. All your personal data (contacts, alerts, profile, preferences) is stored **only in your browser's localStorage**, which means **nothing ever leaves your device**. You own your data, always.

Built with pure **HTML5, CSS3, and vanilla JavaScript**, SafeHer runs on any modern browser, on any device, and can be hosted for free on **GitHub Pages**.

---

## 🌟 What SafeHer Does

SafeHer combines **six essential safety tools** into one unified experience:

### 1. 🚨 One-Tap SOS Emergency Alert
A big, pulsing **SOS button** with a **5-second countdown** and a cancel option. When triggered, SafeHer:
- Fetches your **live GPS coordinates**
- Logs the alert with a timestamp
- Notifies all your saved emergency contacts (in the browser)
- Saves it to your **Alert History** for future reference

### 2. 📍 Live Location Sharing
Real-time **GPS tracking** with:
- Latitude, longitude, and accuracy displayed live
- Interactive **OpenStreetMap preview**
- One-click sharing via **Web Share API** (mobile) or clipboard (desktop)
- Instant link to **Google Maps** for navigation

### 3. 👥 Trusted Emergency Contacts
Add unlimited trusted people with:
- Name, phone number, relationship, and optional email
- Auto-save to browser storage
- One-tap delete with confirmation
- Automatically alerted whenever SOS is triggered

### 4. 📜 Alert History
A complete log of every SOS you've triggered:
- **Active** and **Resolved** status badges
- Timestamp of each alert
- GPS location link
- "Mark as Resolved" button when you're safe

### 5. 🆘 National Helplines (India)
12+ pre-configured helplines organized by category:
- **Emergency:** 112, 100, 101, 102
- **Women & Children:** 181, 1091, 1098, 1090
- **Specialized:** 1930 (Cyber Crime), 9152987821 (iCall), 1800-180-5555 (Suicide Prevention)

All helplines dial instantly with one tap on mobile.

### 6. 🥋 Self-Defense & Safety Guide
A full educational section covering:
- **8 self-defense techniques** (Palm Strike, Knee Strike, Elbow Strike, Wrist Release, Heel Kick, Vulnerable Spots, Escape & Alert, Improvised Weapons)
- **4 categories of safety tips** (Travel, Home, Online, Workplace) — 22 tips total
- **6 situational guides** ("What to do if you're followed / harassed / grabbed / in a bad cab / at home / on public transport")
- **Legal Rights** (FIR, POSH Act, DV Act, Zero FIR, Free Legal Aid, Cyber Protection)
- **Recommended safety apps**
- **Numbers to memorize**

---

## ✨ Key Features at a Glance

| Feature | Description |
|---------|-------------|
| 🚨 **One-Tap SOS** | 5-second cancel window, GPS-tagged alerts |
| 📍 **Live GPS Tracking** | Real-time coordinates + map preview |
| 👥 **Unlimited Contacts** | Add, view, and manage trusted people |
| 📜 **Alert History** | Complete log with status and map links |
| 🆘 **12+ Helplines** | Categorized, one-tap dial |
| 🥋 **Self-Defense Guide** | 8 animated techniques with steps |
| 💡 **Safety Tips** | 22 tips across 4 categories |
| 🎯 **Situation Guides** | 6 "what to do if..." scenarios |
| ⚖️ **Legal Rights** | FIR, POSH, DV Act, Zero FIR explained |
| 🌗 **Dark Mode** | Toggle with smooth animations, persists across pages |
| 📊 **Safety Score** | Personalized 0–100% score based on setup |
| 📋 **Setup Checklist** | Auto-updating steps to reach full protection |
| 📰 **Activity Feed** | Live log of your actions (alerts, contacts) |
| 🔒 **Privacy Promise** | Zero tracking, zero uploads, zero ads |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop ready |
| ✨ **Rich Animations** | Typing effect, pulse rings, floating particles, card cascade, hover lifts |

---

## 🧠 Why SafeHer?

In an emergency, **every second counts**. SafeHer ensures:
- Your loved ones **know your exact location** the moment you need them
- You have **instant access to emergency services** without searching
- You're **educated and prepared** with self-defense and legal knowledge
- Your **privacy is never compromised** — no data leaves your device

SafeHer is built for:
- 👩 **Women traveling alone** — early mornings, late nights, unfamiliar cities
- 🎓 **Students** — commuting to college or living in hostels
- 💼 **Working professionals** — late office hours, client meetings, business trips
- 🏠 **Anyone at risk** — domestic violence survivors, stalking victims, cyber harassment targets
- 🌏 **Every woman** who deserves to feel safe

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Structure** | HTML5 |
| **Styling** | CSS3 (Flexbox, Grid, Custom Properties, Keyframe Animations) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Storage** | Browser `localStorage` |
| **Maps** | OpenStreetMap + Google Maps links |
| **Geolocation** | HTML5 Geolocation API |
| **Sharing** | Web Share API |
| **Hosting** | GitHub Pages |
| **Icons** | Emoji + Inline SVG |

**No frameworks. No build tools. No dependencies. No backend.** Just pure web technology — fast, lightweight, and free.

---

## 📂 Project Structure

```
safewomenapp/
│
├── index.html              → Home (hero, features, how-it-works, testimonials, FAQ)
├── login.html              → Login page
├── register.html           → Registration page
├── dashboard.html          → SOS dashboard, safety score, checklist, activity
├── contacts.html           → Emergency contacts management
├── location.html           → Live location + OpenStreetMap preview
├── alerts.html             → Alert history
├── tips.html               → Safety tips, self-defense, legal rights
├── about.html              → About page
├── profile.html            → User profile + stats
│
├── header.html             → Shared navbar (loaded dynamically)
├── footer.html             → Rich shared footer with social icons + newsletter
│
├── style.css               → Master stylesheet with dark mode + animations
├── theme.js                → Theme toggle, DB helpers, SOS logic, partial loader
│
└── README.md               → This file
```

**Total: 12 files. Zero dependencies. Instant load. 🚀**

---

## 🚀 Live Demo

**👉 [https://patilkinnari53-sketch.github.io/safewomenapp/](https://patilkinnari53-sketch.github.io/safewomenapp/)**

### Test Credentials
| Field | Value |
|-------|-------|
| Email | `any@email.com` |
| Password | `anything` |

> 💡 Demo login accepts any credentials — all data is stored locally in your browser.

---

## 🎬 How to Use

### Option 1: Try the Live Demo
Just open the live URL — no installation needed.

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/patilkinnari53-sketch/safewomenapp.git
cd safewomenapp

# Option A: Direct open (some features may need a server)
open index.html

# Option B: Use a local server (recommended for full functionality)
python3 -m http.server 8000
# Then visit http://localhost:8000 in your browser
```

### Option 3: Deploy Your Own
1. Fork this repo
2. Go to **Settings** → **Pages**
3. Under **Source**, choose **Deploy from a branch**
4. Select **main** / **root**
5. Click **Save**
6. Wait 1–2 minutes → visit `https://YOUR-USERNAME.github.io/safewomenapp/`

---

## 🔒 Privacy Promise

Your safety should never come at the cost of your privacy. SafeHer commits to:

- ✅ **No server uploads** — Every byte of data stays in your browser
- ✅ **No user accounts** — Login is entirely local, nothing is registered online
- ✅ **No tracking** — Zero analytics, zero cookies, zero fingerprinting
- ✅ **No ads** — No third-party scripts, no monetization
- ✅ **No external APIs for personal data** — Only OpenStreetMap for the map preview
- ✅ **Open source** — Audit every line of code yourself
- ✅ **Free forever** — No premium tiers, no locked features

> **Your data is stored in your browser's `localStorage`. Clearing browser data will remove it — which is exactly how it should be.**

---

## 🆘 Emergency Helplines (India)

| Helpline | Number | Purpose |
|----------|--------|---------|
| 🆘 **National Emergency** | **112** | All emergencies (police, fire, medical) |
| 👮 **Police** | **100** | Direct police assistance |
| 🚒 **Fire** | **101** | Fire emergencies |
| 🚑 **Ambulance** | **102** | Medical emergencies |
| 👩 **Women Helpline** | **181** | Women in distress (24/7) |
| 🚫 **Anti-Stalking** | **1091** | Stalking & harassment |
| 👶 **Child Helpline** | **1098** | Children in need |
| 💻 **Cyber Crime** | **1930** | Online harassment & fraud |
| 💚 **Mental Health (iCall)** | **9152987821** | Emotional support |
| 🧠 **Suicide Prevention** | **1800-180-5555** | Crisis intervention |

> All helplines work from any phone in India, 24/7, free of cost.

---

## 🎨 Design Highlights

- 🎨 **Purple & pink gradient theme** — calming yet empowering
- 🌗 **Dark mode & light mode** — smooth transition, saved across pages
- 🚨 **Pulsing SOS button** — with expanding ripple rings
- ✨ **Floating particle background** — subtle ambient animation
- 🎯 **Staggered card entrance** — cards cascade in as you scroll
- ⌨️ **Typing effect** — hero title animates on the home page
- 📊 **Animated counters** — stats count up when in view
- 🎭 **Icon bounce on hover** — every card feels alive
- 🔔 **Slide-up toast notifications** — for every action
- 🎪 **Smooth page transitions** — fade-out before navigation

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. 🍴 **Fork** this repository
2. 🌿 **Create a branch** (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 **Push** (`git push origin feature/AmazingFeature`)
5. 🎉 **Open a Pull Request**

### 💡 Ideas for Future Features
- 🌐 Multi-language support (Hindi, Tamil, Bengali, Marathi)
- 📱 Progressive Web App (installable on phone)
- 🎊 Confetti animation when SOS is cancelled
- 🗺️ "Nearest Police Station" feature using geolocation
- 🔊 Sound effects on SOS trigger
- 📊 Safety analytics dashboard
- 🖨️ Printable emergency reference card
- 🎥 Self-defense video embeds
- 💬 In-app chat with trusted contacts
- 🌙 Auto dark mode based on system preference

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute with attribution.

```
MIT License — Free to use, modify, and share.
Please keep the attribution and share the ❤️.
```

---

## 💌 Contact & Support

<div align="center">

**Made with ❤️ for women's safety**

**Maintainer:** [@patilkinnari53-sketch](https://github.com/patilkinnari53-sketch)

**🌐 Live Site:** [SafeHer](https://patilkinnari53-sketch.github.io/safewomenapp/)

**🐛 Report a Bug:** [Open an issue](https://github.com/patilkinnari53-sketch/safewomenapp/issues)

**💡 Suggest a Feature:** [Start a discussion](https://github.com/patilkinnari53-sketch/safewomenapp/discussions)

</div>

---

## 🌟 Support the Project

If SafeHer helped you or someone you know:

- ⭐ **Star this repository** — it helps more women discover it
- 🐦 **Share it** on social media with **#SafeHer #WomenSafety**
- 📢 **Tell your friends and family** about it
- 🤝 **Contribute** improvements or translations
- 💬 **Give feedback** — your input shapes the future of this app

---

<div align="center">

### 🛡️ *"Your safety is not negotiable. Your voice matters. Your life is precious."* 💜

**#StaySafe #WomenSafety #SafeHer**

**⭐ Star this repo if you believe in a safer world for women ⭐**

</div>

