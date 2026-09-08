# QSR ACADEMY — Full-Stack MERN Website & Lead Management Console

> **Tagline:** Build. Train. Grow. Lead the Next Generation of QSR Professionals.  
> **Official Entity:** QSR Academy (Certificate in Quick Service Restaurant Operations)  
> **Campus Address:** SCO-35, Ground Floor, Opp. VIP Road, High Street Market, Near IDBI Bank, Zirakpur, Punjab 140603, India  

---

## 1. Overview

**QSR ACADEMY** is a production-ready, full-stack MERN application developed for India's premier Quick Service Restaurant management and practical kitchen training academy. The platform accommodates:

1. **Student Admissions (`/admission`)**: Course selection, eligibility checks, and student enrollment intake.
2. **Franchise Partner Acquisition (`/franchise`)**: ₹4 Lakh investment model (₹3L setup + ₹1L franchise fee), 500+ sq ft space requirements, FOFO vs FOCO breakdown, and franchise application pipeline.
3. **Corporate Talent Recruitment (`/hire-talent`)**: Multi-role talent requisition for restaurant brands needing job-ready staff from Day One.
4. **Partner Brand Showcase (`/partners`)**: Infinite auto-scrolling marquee with 11+ allied brands (*Rasna Buzz, Millies Cookies, Ritaza, Roll Express, Nothing Before Coffee, Kings of Rolls, Pizzeria, Doner Shack, Suto, Zorko, Chai Factory*).
5. **Course Catalog & Syllabus (`/courses`, `/courses/:slug`)**: Dynamic curriculum syllabus, learning outcomes, career tracks, and fee breakdown.
6. **Campus Contact (`/contact`)**: SCO-35 Zirakpur campus details, interactive Google Map embed, and general inquiries.
7. **Secure Admin Panel (`/admin/login`, `/admin/dashboard`)**: Dedicated, hidden administration console with JWT `httpOnly` cookie auth, real-time metrics, search/filter lead management, status updates, internal notes, CSV data exports, Course CMS, and dynamic site settings.

---

## 2. Tech Stack

- **MongoDB / Mongoose**: Schemas for `AdminUser`, `Course`, `Admission`, `FranchiseEnquiry`, `HiringEnquiry`, `ContactMessage`, and `SiteSettings`. Fully compatible with MongoDB Atlas in production, with zero-setup development storage.
- **Express.js (Node.js)**: REST API with Helmet security headers, CORS origin restriction, rate-limiting anti-spam, honeypot bot traps, input validation via `express-validator`, and compression.
- **React.js (Vite)**: Modern fast build system, Tailwind CSS v4, Lucide icons, responsive navigation with mobile drawer, and route-level code splitting (`React.lazy` + `Suspense`).

---

## 3. Project Directory Structure

```
QSR/
├── client/                     # Frontend (React 19 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Logo, Navbar, Footer, BrandMarquee, Toast
│   │   ├── context/            # AuthContext (admin session management)
│   │   ├── pages/              # Home, About, Courses, CourseDetail, Franchise,
│   │   │                       # Admission, HireTalent, Partners, Contact
│   │   │   └── admin/          # AdminLogin, AdminDashboard
│   │   ├── services/           # api.js (unified API fetch wrapper)
│   │   ├── App.jsx             # Router configuration & code-splitting
│   │   ├── main.jsx            # React root
│   │   └── index.css           # Design tokens, marquee keyframes, typography
│   ├── index.html              # SEO metadata, Google Fonts, SVG favicon
│   ├── vite.config.js          # Tailwind plugin & backend API proxy
│   ├── .env.example
│   └── package.json
│
├── server/                     # Backend (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # db.js (MongoDB connection with dev fallback)
│   │   ├── controllers/        # auth, course, enquiry, admin, settings
│   │   ├── middleware/         # auth (JWT), rateLimiter, validate, errorHandler
│   │   ├── models/             # Mongoose schemas for all entities
│   │   ├── routes/             # REST route declarations
│   │   ├── scripts/            # seed.js (database population script)
│   │   ├── services/           # store.js (resilient fallback storage)
│   │   └── server.js           # Server bootstrap & middleware assembly
│   ├── .env.example
│   └── package.json
│
├── package.json                # Workspace script aggregator
└── README.md
```

---

## 4. Environment Variables

### Server (`server/.env`)

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas URI (or local mongod)
MONGODB_URI=mongodb://127.0.0.1:27017/qsr_academy

# Authentication
JWT_SECRET=qsr_academy_super_secret_production_jwt_key_2026_secure
JWT_EXPIRES_IN=2h
COOKIE_SECRET=qsr_cookie_secret_key_987654321

# Client URL (CORS allowlist)
CLIENT_URL=http://localhost:5173

# Initial Seed Credentials
ADMIN_SEED_NAME="QSR Academy Admin"
ADMIN_SEED_EMAIL="admin@qsracademy.com"
ADMIN_SEED_PASSWORD="AdminQSR@2026#Secure!"
```

### Client (`client/.env`)

```env
VITE_API_BASE_URL=/api
VITE_SITE_TITLE=QSR ACADEMY | Leading QSR Training Academy in India
```

---

## 5. Getting Started (Local Development)

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Seed Database (Optional for real MongoDB)

```bash
cd server
npm run seed
```

*Note: The application includes pre-seeded operational data out-of-the-box so all forms, course catalog, and the admin panel function immediately even before connecting a remote MongoDB Atlas database.*

### Step 3: Launch Application

Open two terminal windows:

**Terminal 1 — Backend Server:**
```bash
cd server
npm run dev
# Running on http://localhost:5000 (Health check at /api/health)
```

**Terminal 2 — Frontend Client:**
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 6. Admin Panel Access

- **Login URL:** `http://localhost:5173/admin/login`  
  *(Intentionally not linked anywhere in the public navigation bar for security)*
- **Default Email:** `admin@qsracademy.com`
- **Default Password:** `AdminQSR@2026#Secure!`

### Admin Capabilities:
1. **Executive Overview**: Total counts and week-over-week velocity for admissions, franchise leads, corporate hiring requisitions, and contact inquiries.
2. **Lead Management Tables**:
   - Filter by status (`NEW`, `CONTACTED`, `CONVERTED`, `REJECTED`).
   - Search across candidate names, emails, phone numbers, and cities.
   - Click **View / Add Note** to record counsellor calls and follow-ups.
   - One-click **Export CSV** download with clean timestamp formatting.
3. **Course CMS**: Create new courses, edit existing syllabi, toggle active visibility, or delete courses.
4. **Site Settings**: Live updates for campus phone, official emails, and social links.

---

## 7. Security Safeguards Implemented

- **Password Security**: Passwords hashed with bcrypt (salt rounds = 10).
- **JWT in httpOnly Cookies**: Mitigates client-side XSS token theft (`sameSite: strict`, `secure: true` in production).
- **Anti-Spam Rate Limiting**: Max 5 submissions per 10 minutes per IP on public forms; strict lockout on `/api/auth/login` to thwart brute-force attacks.
- **Honeypot Bot Traps**: Hidden decoy fields (`_trap_hp`) on all public forms that trap bots without affecting legitimate human visitors.
- **Input Sanitization**: `express-mongo-sanitize` strips NoSQL operator injections, and `express-validator` validates 10-digit Indian phone numbers and email formats.
- **HTTP Hardening**: Helmet.js sets security headers; CORS restricted to whitelisted frontend origin.

---

## 8. Production Deployment Guide

### Deploying the Backend (Render / Railway / EC2 / DigitalOcean)
1. Push repository to GitHub.
2. Create a Node.js web service with root directory `server`.
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Supply environment variables from `server/.env.example` (set `NODE_ENV=production` and add your real `MONGODB_URI` from MongoDB Atlas).

### Deploying the Frontend (Vercel / Netlify / Cloudflare Pages)
1. Create a project with root directory `client`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable `VITE_API_BASE_URL=https://your-backend-domain.com/api` (or configure reverse proxy rewrites).
