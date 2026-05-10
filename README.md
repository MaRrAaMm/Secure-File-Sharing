# Secure File Sharing Platform

## Overview

Secure File Sharing Platform is a backend-focused web application designed to securely upload, encrypt, manage, and share files between users with permission-based access control.

The system focuses on secure file handling using encryption, authentication, authorization, and activity tracking while providing a simple user interface for interacting with the platform.

---

## Problem the Project Solves

Traditional file-sharing systems often store files in plain form, making sensitive data vulnerable if the server is compromised.

This project solves that problem by:

- Encrypting files before storage
- Restricting file access using authentication and permissions
- Tracking user activities for security monitoring
- Preventing unauthorized downloads and access

---

# Features

- User Registration & Login
- JWT Authentication
- OTP Email Verification
- Secure File Upload
- AES-256-CBC File Encryption
- File Download & Decryption
- File Sharing with Permissions (`read` / `download`)
- Activity Logs (`upload`, `download`, `share`, `delete`)
- Profile Management
- Rate Limiting & Helmet Security
- Dashboard UI for file management

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Joi
- Multer
- Nodemailer

## Frontend

- HTML
- CSS
- Bootstrap
- Vanilla JavaScript

---

# Authentication Flow

1. User registers with email and password
2. OTP verification email is sent
3. User verifies email using OTP
4. User logs in
5. JWT token is generated
6. Protected routes require valid token
7. Authorization middleware validates user access

---

# Security Features

- AES-256-CBC Encryption for uploaded files
- Random IV generated for every file
- JWT Authentication
- OTP Email Verification
- Access Control for shared files
- Permission-based file sharing
- Helmet for securing HTTP headers
- Rate Limiting against brute-force attacks
- Input Validation using Joi
- Encrypted files stored separately from metadata

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/verify-email` | Verify OTP |
| POST | `/auth/login` | Login user |

---

## Files

| Method | Endpoint | Description |
|---|---|---|
| POST | `/files/upload` | Upload encrypted file |
| GET | `/files/download/:fileId` | Download & decrypt file |
| POST | `/files/share/:fileId` | Share file with permissions |
| DELETE | `/files/:fileId` | Delete file |

---

## Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get current user |
| GET | `/users/my-files` | Get user files |
| PUT | `/profile` | Update profile |

---

# Installation

## Clone the repository

```bash
git clone https://github.com/MaRrAaMm/Secure-File-Sharing.git

## Navigate to project folder

```bash
cd Secure-File-Sharing
```

---

## Install dependencies

```bash
npm install
```

---

## Run the server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_URL=your_mongodb_connection

JWT_SECRET=your_jwt_secret

EMAIL=your_email@gmail.com
PASS=your_gmail_app_password

ENCRYPTION_KEY=your_32_byte_key
```


The project follows a modular architecture pattern for better scalability and maintainability.

---


## Dashboard

<img width="1897" height="894" alt="image" src="https://github.com/user-attachments/assets/cb693d9e-5cdb-4778-ace8-de7c33270cd7" />



---

# Future Improvements

- Cloud Storage Integration
- File Expiration & Auto Delete
- Folder Management
- Real-time Notifications
- Two-Factor Authentication (2FA)
- React Frontend Version
- Docker Deployment
- Unit & Integration Testing

---

# Notes

> The live deployment is currently unavailable due to hosting limitations.  
> The project can still be run locally without issues.

---

