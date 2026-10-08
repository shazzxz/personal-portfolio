# Shashwat Solanki — Portfolio

This is my personal portfolio site. I built it to have somewhere to show the projects I've actually been working on, instead of keeping everything scattered across GitHub.

The site is intentionally pretty visual and motion-heavy, but there is a real backend behind it too. The contact form stores enquiries in PostgreSQL and the project/capability data can be loaded from the API.

## Live

- Portfolio: https://personal-portfolio-coyote-f495.vercel.app
- API: https://personal-portfolio-live-mvff.onrender.com
- GitHub: https://github.com/shazzxz/personal-portfolio

## What I used

**Frontend**
- React
- Vite
- CSS
- A bunch of custom scroll/motion effects

**Backend**
- Python
- Flask
- PostgreSQL
- psycopg

**Hosting**
- Vercel for the frontend
- Render for the Flask API
- Supabase for PostgreSQL

## Projects shown

### SRGPC Certificate System
A certificate management system I built for college work. It covers student requests, certificate generation, digital signatures, unique IDs, QR verification, downloads, and separate student/admin workflows.

### Image Watermarking Tool
A Python desktop tool for adding text or logo watermarks to images and PDFs. It also has batch processing, image adjustments, metadata options, optional encryption, and a separate verifier.

### SRGPC Mobile App
A mobile version of the certificate system with Google sign-in, permissions, certificate downloads, and a mobile-friendly interface.

## How the portfolio works

The React app handles the UI and the animations. The Flask API handles the database side of the site.

```
Browser
   ↓
Vercel / React
   ↓
Flask API
   ↓
PostgreSQL
```

The database has three small tables:

- `projects`
- `capabilities`
- `inquiries`

If no database connection is available, the API can still serve the portfolio using the fallback project data in `backend/app.py`.

## Running it locally

### Backend

From the project root:

```bash
python -m venv .venv
```

Activate the virtual environment and install the Python packages:

```bash
pip install -r requirements.txt
```

Create a `.env` file (or set the variables in your shell):

```text
DATABASE_URL=postgresql://user:password@localhost:5432/personal_portfolio
CORS_ORIGINS=http://localhost:5173
```

Then start Flask:

```bash
python backend/app.py
```

The API will be available at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite normally starts at `http://localhost:5173`.

For a production build:

```bash
npm run build
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check the API/database |
| GET | `/api/portfolio` | Get project and capability data |
| POST | `/api/contact` | Save a contact enquiry |

Example contact request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I'd like to discuss a project."
}
```

## Project structure

```text
personal-portfolio/
├── backend/
│   └── app.py
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vercel.json
├── Dockerfile
├── Procfile
├── render.yaml
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## A couple of notes

- The database URL is kept out of GitHub.
- `CORS_ORIGINS` needs to match the frontend URL in production.
- Vercel rewrites `/api/*` requests to the Render backend.
- The root `package.json` is kept for the Render/Docker build, while the actual Vite app lives in `frontend/`.

## About me

I'm Shashwat, a software developer/student who likes building things end-to-end and figuring out the annoying parts when something doesn't work.

- GitHub: https://github.com/shazzxz
- LinkedIn: https://www.linkedin.com/in/shashwat-solanki-80a326390/
- Email: sashwat2005solanki@gmail.com

If you spot something broken or have an idea for the site, feel free to open an issue.
