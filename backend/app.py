import json
import os
from pathlib import Path

import psycopg
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

FALLBACK_PROJECTS = [
    {
        "number": "01", "title": "SRGPC", "label": "FULL-STACK CERTIFICATE SYSTEM", "color": "#a995ff",
        "summary": "A complete digital certificate workflow for students and administrators — requests, templates, digital signatures, unique IDs, QR verification and downloads.",
        "chips": ["PYTHON", "WEB APP", "AUTH", "QR", "PDF"], "metric": "03", "metricLabel": "CORE WORKFLOWS", "shape": "certificate", "sortOrder": 1,
    },
    {
        "number": "02", "title": "WATERMARK", "label": "IMAGE WATERMARKING TOOL", "color": "#71e6ff",
        "summary": "A Python desktop application for watermarking images and PDF documents with editable text and logo overlays, image adjustments, batch processing, metadata controls and optional encryption, plus a companion verifier.",
        "chips": ["PYTHON", "TKINTER", "PDF", "AES-GCM", "BATCH"], "metric": "02", "metricLabel": "DESKTOP APPS", "shape": "verify", "sortOrder": 2,
    },
    {
        "number": "03", "title": "SRGPC", "label": "MOBILE APP", "color": "#ffb17e",
        "summary": "The mobile version of the certificate platform — Google sign-in, permissions, downloads and mobile-specific interface fixes.",
        "chips": ["MOBILE APP", "GOOGLE SIGN-IN", "APK"], "metric": "01", "metricLabel": "MOBILE EXPERIENCE", "shape": "mobile", "sortOrder": 3,
    },
]

FALLBACK_CAPABILITIES = [
    {"number": "01", "title": "Frontend", "summary": "Responsive UI, React, motion design", "sortOrder": 1},
    {"number": "02", "title": "Backend", "summary": "Python, APIs, application logic", "sortOrder": 2},
    {"number": "03", "title": "Data", "summary": "Database integration, structured workflows", "sortOrder": 3},
    {"number": "04", "title": "Auth", "summary": "Google sign-in, sessions, user flows", "sortOrder": 4},
    {"number": "05", "title": "AI", "summary": "AI-assisted development and debugging", "sortOrder": 5},
    {"number": "06", "title": "Deploy", "summary": "GitHub, cloud deployment, app packaging", "sortOrder": 6},
]

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024
origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()]
CORS(app, resources={r"/api/*": {"origins": origins or ["*"]}})


def db_connect():
    url = os.getenv("DATABASE_URL")
    if not url:
        return None
    return psycopg.connect(url)


def set_portfolio_schema(conn):
    with conn.cursor() as cur:
        cur.execute("CREATE SCHEMA IF NOT EXISTS portfolio")
        cur.execute("SET search_path TO portfolio")


def init_db():
    conn = db_connect()
    if conn is None:
        return
    with conn:
        set_portfolio_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS projects (
                    id SERIAL PRIMARY KEY,
                    number TEXT NOT NULL,
                    title TEXT NOT NULL,
                    label TEXT NOT NULL,
                    color TEXT NOT NULL,
                    summary TEXT NOT NULL,
                    chips JSONB NOT NULL,
                    metric TEXT NOT NULL,
                    metric_label TEXT NOT NULL,
                    shape TEXT NOT NULL,
                    sort_order INTEGER NOT NULL UNIQUE
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS capabilities (
                    id SERIAL PRIMARY KEY,
                    number TEXT NOT NULL,
                    title TEXT NOT NULL,
                    summary TEXT NOT NULL,
                    sort_order INTEGER NOT NULL UNIQUE
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS inquiries (
                    id BIGSERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
                """
            )
            for project in FALLBACK_PROJECTS:
                cur.execute(
                    """
                    INSERT INTO projects (number, title, label, color, summary, chips, metric, metric_label, shape, sort_order)
                    VALUES (%s,%s,%s,%s,%s,%s::jsonb,%s,%s,%s,%s)
                    ON CONFLICT (sort_order) DO UPDATE SET
                        number=EXCLUDED.number,
                        title=EXCLUDED.title,
                        label=EXCLUDED.label,
                        color=EXCLUDED.color,
                        summary=EXCLUDED.summary,
                        chips=EXCLUDED.chips,
                        metric=EXCLUDED.metric,
                        metric_label=EXCLUDED.metric_label,
                        shape=EXCLUDED.shape
                    """,
                    (
                        project["number"], project["title"], project["label"], project["color"], project["summary"],
                        json.dumps(project["chips"]), project["metric"], project["metricLabel"], project["shape"], project["sortOrder"],
                    ),
                )
            for capability in FALLBACK_CAPABILITIES:
                cur.execute(
                    """
                    INSERT INTO capabilities (number, title, summary, sort_order)
                    VALUES (%s,%s,%s,%s)
                    ON CONFLICT (sort_order) DO UPDATE SET
                        number=EXCLUDED.number,
                        title=EXCLUDED.title,
                        summary=EXCLUDED.summary
                    """,
                    (capability["number"], capability["title"], capability["summary"], capability["sortOrder"]),
                )


def get_projects():
    conn = db_connect()
    if conn is None:
        return FALLBACK_PROJECTS
    with conn:
        set_portfolio_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                "SELECT number,title,label,color,summary,chips,metric,metric_label,shape,sort_order FROM projects ORDER BY sort_order"
            )
            rows = cur.fetchall()
    return [
        {
            "number": r[0], "title": r[1], "label": r[2], "color": r[3], "summary": r[4], "chips": r[5],
            "metric": r[6], "metricLabel": r[7], "shape": r[8], "sortOrder": r[9]
        }
        for r in rows
    ] or FALLBACK_PROJECTS


def get_capabilities():
    conn = db_connect()
    if conn is None:
        return FALLBACK_CAPABILITIES
    with conn:
        set_portfolio_schema(conn)
        with conn.cursor() as cur:
            cur.execute("SELECT number,title,summary,sort_order FROM capabilities ORDER BY sort_order")
            rows = cur.fetchall()
    return [
        {"number": r[0], "title": r[1], "summary": r[2], "sortOrder": r[3]}
        for r in rows
    ] or FALLBACK_CAPABILITIES



@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    return response

@app.get("/api/health")
def health():
    db_ok = False
    try:
        conn = db_connect()
        if conn is not None:
            with conn:
                with conn.cursor() as cur:
                    cur.execute("SELECT 1")
                    db_ok = cur.fetchone()[0] == 1
    except Exception:
        db_ok = False
    return jsonify({"status": "ok", "database": "connected" if db_ok else "fallback"})


@app.get("/api/portfolio")
def portfolio():
    return jsonify({"projects": get_projects(), "capabilities": get_capabilities()})


@app.post("/api/contact")
def create_inquiry():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()
    if not name or not email or not message:
        return jsonify({"error": "Name, email and message are required."}), 400
    if len(name) > 120 or len(email) > 180 or len(message) > 2000:
        return jsonify({"error": "One or more fields are too long."}), 400

    conn = db_connect()
    if conn is None:
        return jsonify({"error": "Database is not configured yet."}), 503
    with conn:
        set_portfolio_schema(conn)
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO inquiries (name,email,message) VALUES (%s,%s,%s) RETURNING id",
                (name, email, message),
            )
            inquiry_id = cur.fetchone()[0]
    return jsonify({"ok": True, "id": inquiry_id}), 201


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404
    requested = DIST / path
    if path and requested.exists() and requested.is_file():
        return send_from_directory(DIST, path)
    index = DIST / "index.html"
    if index.exists():
        return send_from_directory(DIST, "index.html")
    return jsonify({"message": "Frontend build not found. Run npm run build first."}), 503


try:
    init_db()
except Exception as exc:
    print(f"Database initialization warning: {exc}", flush=True)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=True)