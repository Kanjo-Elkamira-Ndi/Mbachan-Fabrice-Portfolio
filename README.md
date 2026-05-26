<div align="center">

# ⚡ Mbachan Fabice Portfolio

**Personal portfolio & admin dashboard for Mbachan Fabrice**
*Cybersecurity Engineer · DevSecOps Specialist · Penetration Tester*

[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)

[Live Site](https://mbachanfabrice.com) · [Admin Panel](https://mbachanfabrice.com/admin) · [Report a Bug](https://github.com/mbachanfabrice/mbachan-portfolio/issues)

</div>

---

## Overview

A full-stack personal portfolio built to position Mbachan Fabrice as an elite cybersecurity consultant. The public site is a cinematic, dark-premium single-page experience with 11 sections covering expertise, case studies, certifications, and more. The admin dashboard gives Fabrice full content control — CRUD on all portfolio content and a dedicated inbox for contact messages — without touching code.

**Design direction:** Dark premium meets modern SaaS. Think CrowdStrike's precision, Hack The Box's aesthetic, and Linear's interaction quality.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion + CSS keyframes |
| Routing | React Router DOM v6 |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL (raw SQL via `pg` — no ORM) |
| Auth | JWT (admin panel only) |
| Fonts | Syne · Manrope · JetBrains Mono |
| Deployment | Vercel (client) · Railway (server + DB) |

---

## Features

### Public Portfolio
- **Terminal boot intro** — cinematic loading sequence on first visit, stored in `sessionStorage`
- **Particle canvas hero** — interactive network animation with mouse-proximity effects
- **11 sections** — Hero · Trust Bar · About · Expertise · Tech Stack · Experience · Case Studies · Certifications · Testimonials · Contact · Footer
- **Scroll progress indicator** — 2px cyan bar fixed at top of viewport
- **Framer Motion reveals** — every section animates in on scroll with stagger
- **Responsive** — mobile-first, tested across all breakpoints

### Admin Dashboard (`/admin`)
- Protected by JWT authentication
- Full CRUD for: Projects, Certifications, Experience, Tech Stack, Testimonials
- Contact messages inbox — read, mark as read, delete
- Overview dashboard with metrics and recent activity

---

## Project Structure

```
mbachan-fabrice-portfolio/
├── client/                    # React frontend
│   └── src/
│       ├── components/
│       │   ├── ui/            # shadcn components
│       │   ├── layout/        # Navbar, Footer, AdminLayout
│       │   ├── sections/      # One file per portfolio section
│       │   ├── animations/    # ParticleCanvas, TerminalBoot, FadeInView
│       │   └── admin/         # Admin CRUD tables and forms
│       ├── pages/             # Home, admin/* pages, NotFound
│       ├── data/              # Static seed data (V1) — replaced by API in V2
│       ├── hooks/             # useScrollProgress, useInView, useAuth
│       ├── lib/               # api.ts, utils.ts, constants.ts
│       └── types/             # Shared TypeScript interfaces
│
└── server/                    # Express backend
    └── src/
        ├── routes/            # REST endpoints per resource
        ├── controllers/       # Business logic
        ├── models/            # Raw SQL query functions
        ├── middleware/        # JWT auth, rate limiting, error handling
        └── db/
            └── migrations/    # Plain SQL migration files
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

### Clone

```bash
git clone https://github.com/Kanjo-Elkamira-Ndi/Mbachan-Fabrice-Portfolio.git
cd Mbachan-Fabrice-Portfolio
```

### Client (frontend)

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Server (backend)

```bash
cd server
npm install
cp .env.example .env
# Fill in your DATABASE_URL, JWT_SECRET, PORT
npm run dev
```

Runs on `http://localhost:3000`

### Database

```bash
# Create database
createdb mbachan_portfolio

# Run migrations in order
psql -d mbachan_portfolio -f server/src/db/migrations/001_create_projects.sql
psql -d mbachan_portfolio -f server/src/db/migrations/002_create_certifications.sql
psql -d mbachan_portfolio -f server/src/db/migrations/003_create_experience.sql
psql -d mbachan_portfolio -f server/src/db/migrations/004_create_testimonials.sql
psql -d mbachan_portfolio -f server/src/db/migrations/005_create_technologies.sql
psql -d mbachan_portfolio -f server/src/db/migrations/006_create_messages.sql
psql -d mbachan_portfolio -f server/src/db/migrations/007_create_blog_posts.sql
psql -d mbachan_portfolio -f server/src/db/migrations/008_create_users.sql
```

### Environment Variables

**`server/.env`**
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mbachan_portfolio
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:3000/api
```

---

## Deployment

### Client → Vercel

```bash
cd client
npm run build
# Deploy /dist to Vercel — set VITE_API_URL to your Railway server URL
```

### Server → Railway

Connect the GitHub repo to Railway. Set all environment variables in the Railway dashboard. Railway auto-detects Node.js and runs `npm start`.

---

## V1 → V2 Migration

The frontend was built in two phases:

**V1 (static)** — all data served from `src/data/*.ts` local files. Admin uses in-component state. Contact form shows a success toast only.

**V2 (connected)** — replace data file imports with `lib/api.ts` calls. Wire contact form POST to `/api/messages`. Add real JWT login. To migrate a section, replace:

```ts
// V1
import { projects } from '@/data/projects'

// V2
const [projects, setProjects] = useState([])
useEffect(() => { api.get('/projects').then(r => setProjects(r.data)) }, [])
```

---

## Design Tokens

```css
--color-bg-primary:     #080C14;   /* base background */
--color-bg-secondary:   #0D1321;   /* card surfaces */
--color-bg-tertiary:    #111827;   /* elevated surfaces */
--color-accent-cyan:    #00E5FF;   /* primary accent */
--color-accent-emerald: #10B981;   /* secondary accent */
--color-accent-purple:  #7C3AED;   /* tertiary accent */
--color-text-primary:   #F1F5F9;
--color-text-secondary: #94A3B8;
--color-text-muted:     #475569;
```

**Fonts:** `Syne` (headings) · `Manrope` (body) · `JetBrains Mono` (code/terminal accents)

---

## License

This project and its design are the intellectual property of **Mbachan Fabrice**. Code structure contributions by [Kanjo Elkamira Ndi / Alchemy Codes](https://kanjo-elkamira-ndi.vercel.app). Not licensed for reuse without explicit permission.

---

<div align="center">

Built with precision by [Kanjo Elkamira Ndi](https://kanjo-elkamira-ndi.vercel.app) · Designed for [Mbachan Fabrice](https://mbachanfabrice.com)

</div>