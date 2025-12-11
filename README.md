# 📦 Backend Setup -- File Storage & Sharing System

This backend is built using **Node.js**, **Express.js**, **PostgreSQL**,
and **Prisma ORM**.\
It handles file uploads, downloads, user authentication, and metadata
storage.

## 🚀 Tech Stack

-   **Node.js + Express.js** --- REST API backend\
-   **PostgreSQL** --- Database\
-   **Prisma ORM** --- Database client + migrations\
-   **Multer** --- File upload handling\
-   **Cloud Storage / Local Storage** --- Stores uploaded files\

## 📁 Project Structure

    backend/
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── utils/
    │   └── server.js
    ├── uploads/        # (local file storage)
    ├── .env.example
    ├── package.json
    └── README.md

## 🔧 Prerequisites

-   **Node.js** (v18+)
-   **PostgreSQL**
-   **npm / yarn**

## ⚙️ Environment Variables

Create a `.env` file:

    DATABASE_URL="postgresql://username:password@localhost:5432/yourdb"
    PORT=5001

## 📦 Install Dependencies

    npm install

## 🗄️ Setup Database with Prisma

    npx prisma migrate dev --name init
    npx prisma studio

## ▶️ Run the Server

    npm run dev

Backend URL: `http://localhost:5001`

## 📤 File Upload API

### POST /upload

**multipart/form-data**, field name: `file`

Response:

``` json
{
    "message": "Uploaded",
    "document": {
        "id": 4,
        "filename": "1765422247761-573017703-Aman_Joharapurkar-Internship_Report.pdf.pdf",
        "originalName": "Aman Joharapurkar-Internship Report.pdf",
        "filePath": "uploads/1765422247761-573017703-Aman_Joharapurkar-Internship_Report.pdf.pdf",
        "mimeType": "application/pdf",
        "fileSize": 1718877,
        "createdAt": "2025-12-11T03:04:07.786Z"
    }
}

```

## 📥 File Download API

### GET /download/:id

## 🛡️ Assumptions

-   Max file size: **10MB**
-   Single file upload per request
-   PostgreSQL and Prisma ACID guarantees

## 🛑 .gitignore

    node_modules/
    uploads/
    .env
    docker-compose.yml

## 📜 License

MIT.
