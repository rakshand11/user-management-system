# Frontend - User Management System

## About

This is the frontend part of the project built using React.
It connects with the backend APIs and provides UI for login, dashboard, user management, etc.

---

## Tech Used

- React (Vite)
- React Router
- Axios
- Basic CSS

---

## Setup

### 1. Install dependencies

```bash id="j5w7cw"
npm install
```

---

### 2. Run the app

```bash id="3o0qmr"
npm run dev
```

App will run on:

```id="b0bq3g"
https://user-management-system.rakshand.site
```

---

## Pages

- Login
- Dashboard
- Users (admin & manager)
- Create User (admin only)
- Edit User
- Profile

---

## Features

- Login / Logout
- JWT token stored in localStorage
- Protected routes
- Role based UI (admin / manager / user)
- User CRUD operations
- API integration using axios

---

## How it works

- After login, token is saved in localStorage
- All API calls include token in headers
- Routes are protected based on user role
- Admin and manager see different UI options

---

## Notes

- Make sure backend is running on:

```id="wd8q3r"
http://localhost:3000
```

- If you get CORS error, enable cors in backend

---

## Extra

UI is kept simple using basic CSS.
Main focus was functionality and role-based access.
