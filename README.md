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
* **PostgreSQL (via Prisma Postgres)**
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
│   │   ├── generated/
│   │   │   └── prisma/        ← Generated Prisma Client lives here
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
git clone https://github.com/Watuulo-Richard/better-auth-lesson.git
cd better-auth-lesson
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Copy the example env file and rename it:

```bash
cp .env.example .env
```

Then open your `.env` file and fill in the values below.

---

#### 🗄️ DATABASE_URL — Get Your Prisma Postgres Connection String

This connects your app to your database. Follow these steps:

1. Go to [https://console.prisma.io](https://console.prisma.io) and sign in (or create a free account)
2. Click **"New Project"** and give it a name
3. Choose **"Prisma Postgres"** as your database *(you get 5 free databases)*
4. Once created, open your project dashboard
5. Click **"Connect"** and copy the connection string

Your URL will look like this:

```
prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE
```

Paste it into your `.env` file:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE"
```

---

#### 🔑 BETTER_AUTH_SECRET — Generate a Secure Secret Key

This is a secret key used to sign and verify authentication tokens. Keep it private — never share it or push it to GitHub.

Pick **one** of these ways to generate it:

**Option 1 — Terminal (openssl):**
```bash
openssl rand -base64 32
```

**Option 2 — Terminal (Node.js):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3 — Browser:**
Visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) and copy the result.

Paste the generated value into your `.env` file:

```env
BETTER_AUTH_SECRET="paste-your-generated-secret-here"
```

---

#### 🌐 BETTER_AUTH_URL — Your App's Base URL

```env
# During development:
BETTER_AUTH_URL="http://localhost:3000"

# After deploying to Vercel, change it to your live URL:
# BETTER_AUTH_URL="https://your-app.vercel.app"
```

---

#### ✅ Your Final `.env` Should Look Like This

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE"
BETTER_AUTH_SECRET="paste-your-generated-secret-here"
BETTER_AUTH_URL="http://localhost:3000"
```

> ⚠️ **Never commit your `.env` file to GitHub.** Make sure `.env` is listed in your `.gitignore`.

---

### 4️⃣ Setup Your Prisma Schema

Open `prisma/schema.prisma` and replace its contents with the following schema. This includes all the models needed for Better Auth to work:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id               String    @id @default(cuid())
  firstName        String
  lastName         String
  name             String
  phone            String?
  role             UserRole  @default(USER)
  email            String
  emailVerified    Boolean
  phoneVerified    Boolean   @default(false)
  physicalVerified Boolean   @default(false)
  image            String?
  createdAt        DateTime
  updatedAt        DateTime
  sessions         Session[]
  accounts         Account[]

  @@unique([email])
  @@unique([phone])
  @@map("user")
}

enum UserRole {
  ADMIN
  USER
}

model Session {
  id         String   @id @default(cuid())
  expiresAt  DateTime
  token      String
  rememberMe Boolean  @default(false)
  createdAt  DateTime
  updatedAt  DateTime
  ipAddress  String?
  userAgent  String?
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}

model Account {
  id                    String    @id @default(cuid())
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime
  updatedAt             DateTime

  @@map("account")
}

model Verification {
  id         String    @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}
```

---

### 5️⃣ Push Schema to Database & Generate Prisma Client

Push your schema to the database (this creates your tables):

```bash
npx prisma db push
```

> ⚠️ **Note:** Use `prisma db push` instead of `prisma migrate dev` — it works correctly with Prisma Postgres.

Then generate the Prisma client:

```bash
npx prisma generate
```

*(Optional)* Open Prisma Studio to view your data in a browser UI:

```bash
npx prisma studio
```

---

### 6️⃣ Start the Dev Server

```bash
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000) 🚀

---

## 🔐 Authentication Flow Overview

This project demonstrates:

* How to register a new user
* How to authenticate with email/password
* How sessions and cookies are managed
* How to protect dashboard routes
* How to access the current user on server and client components

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

MIT License © 2026