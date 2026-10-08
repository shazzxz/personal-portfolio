# Shashwat Solanki — Personal Portfolio

A motion-driven full-stack personal portfolio upgraded for a full-stack internship requirement.

## Stack
- React + Vite frontend
- Flask REST API
- PostgreSQL for portfolio content and contact inquiries
- Render-ready deployment configuration

## Full-stack features
- Projects and capabilities are served from PostgreSQL through `/api/portfolio`.
- Contact inquiries are validated and stored in PostgreSQL through `/api/contact`.
- `/api/health` reports API/database health.
- The frontend falls back to embedded data when the API is unavailable during local development.

## Local development
1. Copy `.env.example` to `.env` and set `VITE_API_URL=http://localhost:5000`.
2. Start the API with `python backend/app.py`.
3. Run the frontend with `npm install && npm run dev`.

For a production build, `npm run build` creates `dist/`; the Flask server serves that build in the Docker/Render setup.
