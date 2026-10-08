# Shashwat Solanki — Personal Portfolio

A motion-driven, full-stack personal portfolio built to showcase software projects, product-building skills, and real-world deployment experience.

## Live project

- **Portfolio:** https://personal-portfolio-coyote-f495.vercel.app
- **Backend API:** https://personal-portfolio-live-mvff.onrender.com
- **GitHub:** https://github.com/shazzxz/personal-portfolio

## Technology stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + CSS |
| Backend | Python + Flask |
| Database | PostgreSQL |
| Database hosting | Supabase |
| Frontend deployment | Vercel |
| Backend deployment | Render |
| Version control | Git + GitHub |

## Architecture

```text
Browser
   │
   ▼
Vercel
React / Vite frontend
   │
   │ /api/*
   ▼
Render
Flask REST API
   │
   ▼
Supabase PostgreSQL
```

The portfolio uses a dedicated Supabase PostgreSQL database. It is separate from the database used by the SRGPC Certificate System.

## What the project demonstrates

- Responsive portfolio UI with a motion-first visual system.
- Scroll-driven cinematic sections and interactive transitions.
- Project showcase for:
  - **SRGPC Certificate System** — full-stack certificate workflow with requests, digital signatures, unique IDs, QR verification, downloads, and admin/student workflows.
  - **Image Watermarking Tool** — Python desktop watermarking/verifier workflow with image/PDF processing, batch operations, metadata controls, and optional encryption.
  - **SRGPC Mobile App** — mobile certificate experience with Google sign-in, permissions, downloads, and mobile UI.
- Capability section covering frontend, backend, data, authentication, AI-assisted development, and deployment.
- Contact/inquiry form backed by Flask and PostgreSQL.
- Database health endpoint for deployment verification.
- Production deployment split across Vercel and Render.
- Environment-based configuration with secrets kept outside the repository.

## API

### `GET /api/health`

Returns API and database health.

Example:

```json
{
  "status": "ok",
  "database": "connected"
}
```

### `GET /api/portfolio`

Returns project and capability data from PostgreSQL.

### `POST /api/contact`

Validates and stores a portfolio inquiry in PostgreSQL.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to discuss a project."
}
```

## Database design

The Flask backend creates its portfolio tables inside the **`portfolio` PostgreSQL schema**:

- `projects`
- `capabilities`
- `inquiries`

The schema is created only when the configured `DATABASE_URL` is available.

## Local development

### 1. Backend

From the repository root:

```bash
python -m venv .venv
```

Activate the environment and install dependencies:

```bash
pip install -r requirements.txt
```

Set environment variables using `.env` or your shell:

```text
DATABASE_URL=postgresql://user:password@localhost:5432/personal_portfolio
CORS_ORIGINS=http://localhost:5173
```

Start Flask:

```bash
python backend/app.py
```

The API runs at `http://localhost:5000`.

### 2. Frontend

The Vercel deployment uses the `frontend/` directory as its project root.

```bash
cd frontend
npm install
npm run dev
```

Vite will start the development server, normally at `http://localhost:5173`.

For a production build:

```bash
npm run build
```

## Environment variables

`DATABASE_URL` is a secret database connection string and must never be committed.

`CORS_ORIGINS` should contain the allowed frontend origin(s).

`VITE_API_URL` can be used for local development when the frontend needs to target a non-default API host. In production, Vercel rewrites `/api/*` to the Render backend through `frontend/vercel.json`.

## Deployment

### Frontend — Vercel

The Vercel project is configured with:

- **Root Directory:** `frontend`
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Backend — Render

The Render service runs the Flask API using the repository's Dockerfile and Gunicorn.

Production environment variables include:

- `DATABASE_URL` — Supabase PostgreSQL connection string
- `CORS_ORIGINS` — production Vercel URL

## Project structure

```text
personal-portfolio/
├── backend/
│   └── app.py                 # Flask API + PostgreSQL integration
├── frontend/
│   ├── src/
│   │   ├── main.jsx          # React application
│   │   └── styles.css        # Portfolio styling and motion system
│   ├── index.html
│   ├── package.json
│   └── vercel.json            # Vercel API rewrite
├── src/                       # Render-compatible root frontend copy
├── index.html
├── package.json
├── Dockerfile
├── Procfile
├── requirements.txt
├── render.yaml
├── .env.example
├── .gitignore
└── README.md
```

## Submission summary

This project satisfies a full-stack web-development brief requiring:

- a React-based frontend,
- a Flask backend,
- a PostgreSQL database,
- and deployment on a supported hosting platform.

The live deployment combines **Vercel + Render + Supabase PostgreSQL**.

## Author

**Shashwat Solanki**

- GitHub: https://github.com/shazzxz
- LinkedIn: https://www.linkedin.com/in/shashwat-solanki-80a326390/
- Email: sashwat2005solanki@gmail.com
