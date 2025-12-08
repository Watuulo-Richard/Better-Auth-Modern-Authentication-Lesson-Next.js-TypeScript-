Here is a **clean, professional, production-ready README.md** for your Better Auth + Next.js + Prisma (PostgreSQL) repository.

---

# Better Auth Lesson – Next.js + Prisma + PostgreSQL

A clean and beginner-friendly authentication project built with **Next.js**, **TypeScript**, **Better Auth**, **Prisma**, and **PostgreSQL**.
This repository is designed as a complete learning guide for building secure, scalable, and production-ready authentication systems.

---

## ✨ Features

### 🛡️ Authentication (Better Auth)

* Email & password registration
* Secure login & logout
* Protected routes (client & server)
* Session management
* Token refresh handling
* Strong validation & error messages

### ⚙️ Tech Stack

* **Next.js 16**
* **TypeScript**
* **Better Auth**
* **Prisma ORM**
* **PostgreSQL**
* **Tailwind CSS**

---

## 📁 Project Structure

```
better-auth-lesson/
│── src/
│   ├── app/
│   │   ├── (auth)/login
│   │   ├── (auth)/register
│   │   ├── dashboard/  (protected)
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── server.ts
│   │   │   ├── client.ts
│   ├── components/
│── prisma/
│   ├── schema.prisma
│── .env
│── README.md
```

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/better-auth-lesson.git
cd better-auth-lesson
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
BETTER_AUTH_SECRET="your-secret-key"
```

### 4️⃣ Setup Prisma

Run migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

### 5️⃣ Start the Dev Server

```bash
npm run dev
```

---

## 🔐 Authentication Flow Overview

This project demonstrates:

* How to register a new user
* How to authenticate with email/password
* How sessions and cookies are managed
* How to protect dashboard routes
* How to access the current user on server and client components

---

## 🧩 Prisma Schema Example

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 📚 Learning Goals

By working through this project, you will learn:

* How authentication works in a full-stack environment
* How to integrate Better Auth into a real app
* How to use Prisma with PostgreSQL
* How to protect pages and API routes in Next.js
* How to write clean, reusable auth logic

---

## 🤝 Contributing

Feel free to open issues, submit pull requests, or extend the project with:

* OAuth (Google, GitHub, etc.)
* Email verification
* 2FA
* Role-based access control

---

## 📄 License

MIT License © 2025

---

If you want, I can also generate:
✅ Complete `schema.prisma`
✅ Auth UI pages (login/register)
✅ Auth logic files
✅ Protected route middleware

Just say **“generate files”**!
