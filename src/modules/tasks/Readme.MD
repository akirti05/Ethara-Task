# 🚀 Ethara Task Manager API

A backend API for managing users, projects, and tasks with authentication.

---

## 📌 Features

- 🔐 JWT Authentication (Register & Login)
- 📁 Project Management
- ✅ Task Management (Create, Update, Delete)
- 🌐 Deployed on Railway

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL (Railway)
- Prisma ORM
- Joi Validation
- JWT Authentication

---

## 🌐 Live API

https://ethara-task-production-81bd.up.railway.app

---

## 📡 API Endpoints

### 🔐 Auth
POST /api/auth/register  
POST /api/auth/login  

### 📁 Projects
POST /api/projects  
GET /api/projects  

### ✅ Tasks
POST /api/tasks  
GET /api/tasks/:projectId  
PATCH /api/tasks/:taskId  
DELETE /api/tasks/:taskId  

---

## 🔑 Authentication

Add header:

Authorization: Bearer <your_token>

---

## 📦 Example Request

POST /api/tasks

{
  "title": "Finish submission",
  "description": "Wrap up API",
  "projectId": "your-project-id"
}

---

## ⚙️ Setup (Local)

git clone <repo-url>  
cd backend  
npm install  

Create .env:

DATABASE_URL=your_database_url  
JWT_SECRET=your_secret  

Run:

npx prisma generate  
npx prisma migrate dev  
npm run dev  

---

This project demonstrates backend API development, authentication, database integration, and deployment.