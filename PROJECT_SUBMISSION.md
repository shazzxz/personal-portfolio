# Project Submission — Personal Portfolio Website

## Live links

- Live website: https://personal-portfolio-coyote-f495.vercel.app
- Backend health check: https://personal-portfolio-live-mvff.onrender.com/api/health
- GitHub repository: https://github.com/shazzxz/personal-portfolio

## Stack

- React.js / Vite
- Python / Flask
- PostgreSQL / Supabase
- Vercel
- Render
- Git / GitHub

## Architecture

```text
Vercel (React frontend)
        │
        ▼
Render (Flask API)
        │
        ▼
Supabase (PostgreSQL)
```

## Core functionality

1. Motion-driven portfolio landing experience.
2. Scroll-based project presentations.
3. Project and capability data delivered through an API.
4. Contact/inquiry submission stored in PostgreSQL.
5. Database/API health endpoint.
6. Production deployment with separate frontend and backend services.

## Verification

The production backend health endpoint returns:

```json
{"status":"ok","database":"connected"}
```

This confirms the Flask backend is connected to PostgreSQL.

## Submission note

The frontend is hosted on **Vercel** to satisfy the hosting requirement, while the Flask API runs on **Render** and PostgreSQL is hosted by **Supabase**.
