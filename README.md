# 🚀 Secure API Gateway

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Swagger](https://img.shields.io/badge/Docs-Swagger-brightgreen)](#-api-documentation)

A secure **API Gateway** with API key auth, rate limiting, analytics, and Swagger docs, built with Node.js, TypeScript, and MySQL.

---

## ✨ Features

* 🔑 API key authentication (unique per user)
* ⏳ Rate limiting per key
* 📊 Per-user analytics (requests, errors, latency)
* 📝 Swagger API documentation
* 🗄️ Request logging in MySQL

---

## 🛠 Tech Stack

Node.js, Express, TypeScript, MySQL, bcrypt, Swagger, express-rate-limit

---

## ⚡ Setup

```bash
git clone https://github.com/your-username/secure-api-gateway.git
cd secure-api-gateway
npm install
```

Create `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=api_gateway
```

Start server:

```bash
npm run dev
```

---

## 📖 API Docs

Swagger UI: `http://localhost:5000/api-docs`

### Example

```http
GET /analytics
Headers: { "x-api-key": "<your_api_key>" }
```

---

## 🙋 Why This Project?

Demonstrates a full **Node.js backend** with authentication, analytics, rate limiting, and documentation — perfect for backend portfolios or interviews.
