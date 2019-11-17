FROM node:10

WORKDIR /monitor

COPY backend /monitor/backend
COPY frontend /monitor/frontend

RUN npm install -f /monitor/backend/package.json
RUN npm install -f /monitor/frontend/package.json




