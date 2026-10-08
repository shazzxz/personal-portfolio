FROM node:22-alpine AS frontend

WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY --from=frontend /app/frontend/dist ./dist

EXPOSE 10000
CMD ["sh", "-c", "gunicorn --chdir backend --bind 0.0.0.0:${PORT:-10000} app:app"]
