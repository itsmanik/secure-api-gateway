# 🚀 Secure API Gateway (Node.js + TypeScript + MySQL)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-API%20Gateway-black)](https://expressjs.com/)
[![Swagger](https://img.shields.io/badge/Docs-Swagger%20UI-brightgreen)](#-api-documentation)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)](https://www.mysql.com/)

A secure, interview-ready **API Gateway** built with Node.js, TypeScript, and MySQL. It provides authentication, API key management, request logging, analytics, and rate-limiting — everything needed to manage APIs securely.

---

## ✨ Features

* 🔑 **API Key Authentication** – Each client gets a unique key.
* 📊 **Analytics Dashboard** – Track requests, errors, response times, and per-endpoint stats.
* ⏳ **Rate Limiting** – Protect APIs from abuse by limiting requests.
* 📝 **Request Logging** – Logs every API hit with client ID, status, endpoint, and latency.
* 📖 **API Documentation** – Swagger UI at `/api-docs`.
* 🗄️ **MySQL Database** – Stores clients, API keys, and request logs.

---

## 🛠 Tech Stack

* Backend: Node.js, Express, TypeScript
* Database: MySQL
* Documentation: Swagger (OpenAPI 3.0)
* Authentication: API Keys
* Middleware: express-rate-limit, bcrypt

---

## 📂 Project Structure

```
secure-api-gateway/
├── src/
│   ├── config/
│   │   ├── db.ts           # MySQL pool configuration
│   │   └── swagger.ts      # Swagger setup (/api-docs)
│   ├── controllers/
│   │   ├── analyticsController.ts
│   │   └── authController.ts
│   ├── middlewares/
│   │   ├── apiKeyAuth.ts   # Validates x-api-key
│   │   ├── rateLimiter.ts  # Rate limiting middleware
│   │   └── requestLogger.ts# Logs every request to DB
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── analytics.ts
│   │   └── test.ts
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/secure-api-gateway.git
cd secure-api-gateway
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=api_gateway
```

### 4. Run database migrations

```sql
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  api_key VARCHAR(255) UNIQUE
);

CREATE TABLE api_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  api_key VARCHAR(255),
  endpoint VARCHAR(255),
  method VARCHAR(50),
  status_code INT,
  response_time_ms INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the server

```bash
npm run dev          # development
npm run build && npm start  # production
```

---

## 📖 API Documentation

Swagger UI: `http://localhost:5000/api-docs`

### Example Endpoints

#### 🔑 Authentication

```http
POST /auth/signup
```

Registers a new client and returns an API key.

```http
POST /auth/login
```

Logs in an existing user.

#### 📊 Analytics

```http
GET /analytics
Headers: { "x-api-key": "<your_api_key>" }
```

Returns usage analytics scoped to the caller’s API key.

#### ⏳ Rate Limited Endpoint

```http
GET /test
Headers: { "x-api-key": "<your_api_key>" }
```

Access limited based on rate limits.

---

## 🧪 Testing

* **Postman** – test endpoints manually.
* **Swagger UI** – try requests directly from `/api-docs`.

Example with curl:

```bash
curl -H "x-api-key: your_api_key" http://localhost:5000/analytics
```

---

## 🚀 Deployment

* Deploy on Render, Railway, Vercel, or Heroku.
* Update `.env` with production DB credentials.
* Run production build:

```bash
npm run build
npm start
```

---

## 🙋 Why This Project?

* Demonstrates API Gateway architecture.
* Implements authentication, rate limiting, logging, and analytics.
* Uses Node.js + TypeScript + MySQL in a clean structure.
* Perfect for backend developer portfolios or interviews.
