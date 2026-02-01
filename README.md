Secure File Sharing Web Platform (Backend)

📌 Project Overview

This project is a Secure File Sharing Backend System designed to allow users to upload, download, and share files with strong security guarantees.

The system focuses on:

Encryption at rest

Strict access control

Clear ownership rules

Full audit logging

The goal is not just functionality, but to demonstrate secure backend design principles.

 Problem Statement

Traditional file sharing systems often suffer from security issues such as:

Storing files in plaintext

Weak access control

No traceability of user actions

Inability to audit sensitive operations

This project addresses these issues by designing a backend where:

Files are never stored unencrypted

Access is explicitly controlled per file

Every sensitive operation is logged

🛡️ Security Design Principles

The system is built around the following security principles:

Zero Trust Input

No request is trusted by default.

All inputs are validated before processing.

Encryption at Rest

Files are encrypted before being written to disk.

No plaintext file is ever stored on the server.

Least Privilege

Users can only access files they own or files explicitly shared with them.

Sharing permissions are granular (read / download).

Auditability

All critical actions are logged (upload, download, share).

🔑 Authentication & Authorization
Authentication

Implemented using JWT (JSON Web Tokens).

Each request to a protected endpoint must include a valid token.

Tokens contain:

User ID

Email

Role

Authorization

Role-based authorization is applied where applicable.

File-level authorization is enforced inside file services:

Only the owner can share a file.

Download access depends on ownership or explicit sharing permission.

📂 Secure File Handling Flow

1- File Upload

User sends a file using multipart/form-data.

Multer validates:

File type (MIME type whitelist)

File size limit

File is kept in memory only (not written to disk).

File is encrypted using AES before storage.

Encrypted file is written to disk.

File metadata is stored in MongoDB.

Upload action is logged.

2- File Download

User requests a file download.

System verifies:

User authentication

File existence

Access permission (owner or shared with download permission)

Encrypted file is read from disk.

File is decrypted in memory only.

File is sent to the user.

Download action is logged.

3- File Sharing

Only the file owner can share a file.

Target user must exist.

Duplicate sharing is prevented.

Sharing permission is stored per user.

Share action is logged.

🧾 Logging & Audit Trail

The system maintains a dedicated logging module to record:

File uploads

File downloads

File sharing events

Each log entry contains:

User

File

Action type

Timestamp

This provides:

Accountability

Traceability

Security auditing capability


API Endpoints (Summary)*
Auth

POST /auth/register

POST /auth/login

Files

POST /files/upload

GET /files/:fileId/download

POST /files/:fileId/share

Logs

GET /logs/my-logs

Technologies Used

Node.js

Express.js

MongoDB & Mongoose

JWT

bcrypt

Multer

AES Encryption (crypto)

Joi Validation

 How to Run Locally

Clone the repository

Install dependencies:

npm install


Create a .env file with:

DB_URL=
JWT_SECRET=
CRYPTO_SECRET=


Run the server:

npm start

📌 Key Takeaways

Files are never stored in plaintext.

Access control is enforced per file, not globally.

Security is implemented in layers:

Validation

Authentication

Authorization

Encryption

Logging

** Conclusion

This project demonstrates how secure backend systems can be designed by combining:

Proper cryptographic practices

Clear authorization logic

Defensive programming

Audit logging

It is intended as an educational and practical example of secure file handling in backend systems.
