# 🌈 Smiling Friends Fan Page

An unofficial fan page dedicated to the animated series **Smiling Friends**, built as an academic project to practice modern web development technologies.

![Smiling Friends](https://img.shields.io/badge/Fan-Project-yellow)
![Status](https://img.shields.io/badge/Status-In%20Development-blue)

## 📖 About

This project is a full-stack web application that allows users to browse characters from the Smiling Friends series. Users can register and log in to explore the platform, while administrators have the ability to create, edit, and delete characters.

**Note:** This is a non-commercial fan project created for educational purposes only.

## ✨ Features

- 🎭 Browse the complete character catalog
- 🔐 User registration and authentication
- ⚡ Admin panel for character management (CRUD operations)
- 📱 Responsive design

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/ualrmg429/smiling-friends.git
cd smiling-friends
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure your database URL
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👤 Author

**Raúl Martínez Gutiérrez**

## 🙏 Acknowledgments

Special thanks to **Zach Hadel** and **Michael Cusack**, the creators of Smiling Friends, for bringing this wonderfully weird show to life. This project is a tribute to their creativity.

Smiling Friends is produced by **Adult Swim**. All character rights belong to their respective owners.

---

*Made with 💛 for academic purposes*