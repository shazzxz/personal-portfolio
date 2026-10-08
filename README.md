# Shashwat Solanki — Portfolio

This is my personal portfolio site. I built it as a place to show the projects I'm working on and keep the links to everything in one place.

The frontend is a React/Vite app with custom CSS and scroll-based animations. A small Flask API handles portfolio data and contact enquiries, with PostgreSQL behind it.

## Live

- Website: https://personal-portfolio-coyote-f495.vercel.app
- API: https://personal-portfolio-live-mvff.onrender.com
- GitHub: https://github.com/shazzxz/personal-portfolio

## What I used

**Frontend**
- React
- Vite
- CSS

**Backend**
- Python
- Flask
- PostgreSQL
- psycopg

**Hosting**
- Vercel
- Render
- Supabase

## Projects

### SRGPC Certificate System
A college certificate system for student requests, certificate generation, digital signatures, unique IDs, QR verification and downloads.

### Image Watermarking Tool
A Python desktop app for watermarking images and PDFs. It includes batch processing, image adjustments, metadata options, optional encryption and a verifier.

### SRGPC Mobile App
The mobile version of the certificate platform with Google sign-in, permissions and certificate downloads.

## API

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/health` | Checks the API and database |
| GET | `/api/portfolio` | Returns project and capability data |
| POST | `/api/contact` | Stores a contact enquiry |

The database uses a `portfolio` schema with three tables:

- `projects`
- `capabilities`
- `inquiries`

The backend also has fallback project data, so the portfolio can still load when a database connection is not available during local development.

## Running it locally

### Backend

Create a virtual environment and install the Python dependencies:

```bash
python -m venv .venv
pip install -r requirements.txt
```

Set the variables in `.env` (or your shell):

```text
DATABASE_URL=postgresql://user:password@localhost:5432/personal_portfolio
CORS_ORIGINS=http://localhost:5173
```

Then run:

```bash
python backend/app.py
```

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

## Deployment

The public site runs from Vercel and the Flask API runs on Render. Supabase provides the PostgreSQL database.

The Vercel project uses `frontend/` as its root directory. Render uses the root Dockerfile and builds the frontend before starting Gunicorn.

Secrets such as `DATABASE_URL` are kept in the hosting provider settings and are not committed to the repository.

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
├── .dockerignore
├── LICENSE
└── README.md
```

## Contact

GitHub: https://github.com/shazzxz

LinkedIn: https://www.linkedin.com/in/shashwat-solanki-80a326390/

Email: sashwat2005solanki@gmail.com
