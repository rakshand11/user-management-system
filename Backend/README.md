# Backend - User Management System

## About

This backend is built for a user management system where different users have different roles like admin, manager and normal user.

It handles authentication, user creation, updates and role-based access.

---

## Tech Used

- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- Bcrypt

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```
MONGO_URI=
JWT_SECRET=
PORT=3000
```

---

### 3. Run the server

```bash
npm run dev
```

Server runs on:

```
https://user-management-system-dkdx.onrender.com
```

---

## Routes

### Auth Routes

- POST `/user/register` → register user
- POST `/user/login` → login user
- GET `/user/get-profile` → get logged in user
- PUT `/user/update` → update profile

---

### Admin / Manager Routes

- POST `/admin/create` → create user (admin only)
- GET `/admin/users` → get all users
- GET `/admin/users/:id` → get single user
- PUT `/admin/update/:id` → update user (admin)
- PUT `/admin/manager/update/:id` → update user (manager)
- DELETE `/admin/delete/:id` → deactivate user

---

## Roles

- Admin → can do everything
- Manager → can view and update users (not admin)
- User → can only access their profile

---

## Features

- Login & Register
- JWT authentication
- Password hashing
- Role based access
- Search and pagination
- Soft delete (user becomes inactive)

---

## Notes

- For protected routes, token is required
- Send token in header like:

```
Authorization: Bearer token
```

---

## Testing

You can test APIs using Postman or Thunder Client.

---

## Extra

Didn’t add advanced things like email verification or reset password due to time, but can be added later.
