# Finance Data Processing and Access Control Backend

## Overview

This project is a backend system built for a finance dashboard application.
It handles financial records such as income and expenses, and enforces role-based access control for different users.

The main objective of this project is to demonstrate clean backend architecture, proper data handling, and implementation of access control in a structured way.

---

## Features

* User management with role assignment (Admin, Analyst, Viewer)
* Financial records CRUD operations
* Advanced filtering (type, category, date)
* Search functionality (category and notes)
* Pagination support for records
* Sorting (by date and amount)
* Soft delete and restore functionality
* Role-based access control using middleware
* Dashboard analytics (summary, category-wise, monthly trends, type summary)
* Input validation and centralized error handling
* Consistent API response structure
* Rate limiting to prevent excessive requests

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)
* dotenv

---

## Project Structure

The project follows a layered architecture:

Route → Middleware → Controller → Service → Repository → Database

* **Routes**: Define API endpoints
* **Middleware**: Handles authentication simulation, role checks, rate limiting, and error handling
* **Controllers**: Manage request and response flow
* **Services**: Contain business logic
* **Repositories**: Handle database queries

This structure ensures clear separation of concerns and makes the application easier to maintain and extend.

---

## Database Design

### Users Table

* id
* name
* email
* role (admin, analyst, viewer)
* status (active/inactive)
* created_at
* updated_at

---

### Records Table

* id
* amount
* type (income/expense)
* category
* date
* note
* user_id
* is_deleted (soft delete flag)
* created_at
* updated_at

---

## Authentication Approach

This project uses a mock authentication approach.

The user role is passed through request headers:

```
role: admin | analyst | viewer
```

If no role is provided, it defaults to `viewer`.

This approach is used to demonstrate role-based access control without implementing a full authentication system.

In a real-world application, this can be replaced with JWT-based authentication.

---

## Role-Based Access Control

| Action         | Admin   | Analyst     | Viewer      |
| -------------- | ------- | ----------- | ----------- |
| Create User    | Allowed | Not Allowed | Not Allowed |
| View Users     | Allowed | Not Allowed | Not Allowed |
| Create Record  | Allowed | Not Allowed | Not Allowed |
| View Records   | Allowed | Allowed     | Allowed     |
| Update Record  | Allowed | Not Allowed | Not Allowed |
| Delete Record  | Allowed | Not Allowed | Not Allowed |
| Restore Record | Allowed | Not Allowed | Not Allowed |
| Dashboard APIs | Allowed | Allowed     | Not Allowed |

---

## API Endpoints

### Users

* `POST /users` → Create user (Admin only)
* `GET /users` → Get all users (Admin only)

---

### Records

* `POST /records` → Create record (Admin only)
* `GET /records` → Get records (All roles)

Supports:

* Filtering:

  * `/records?type=income`
  * `/records?category=food`
  * `/records?date=2026-04-02`

* Search:

  * `/records?search=salary`

* Pagination:

  * `/records?page=1&limit=5`

* Sorting:

  * `/records?sort=amount`

---

* `PUT /records/:id` → Update record (Admin only)
* `DELETE /records/:id` → Soft delete record (Admin only)
* `PATCH /records/:id/restore` → Restore record (Admin only)

---

### Dashboard

* `GET /dashboard/summary` → Overall financial summary
* `GET /dashboard/category-summary` → Category-wise totals
* `GET /dashboard/monthly-trends` → Monthly aggregated data
* `GET /dashboard/type-summary` → Income vs expense summary

(Accessible by Admin and Analyst)

---

## Sample API Response

### Success

```json
{
  "success": true,
  "message": "Records fetched",
  "data": {}
}
```

---

### Error

```json
{
  "success": false,
  "message": "Access denied"
}
```

---

## Setup Instructions

1. Clone the repository

2. Install dependencies

```
npm install
```

3. Create a `.env` file in the root directory

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/finance_dashboard_db
PORT=5000
```

4. Create database and tables in PostgreSQL

5. Start the server

```
npm start
```

---

## Testing the APIs

Use Postman to test the APIs.

Add the role header in each request:

```
role: admin
```

or

```
role: analyst
```

or

```
role: viewer
```

Test different roles to verify access control behavior.

---

## Assumptions

* Authentication is simulated using headers
* System is designed for backend demonstration purposes
* No frontend is included

---

## Possible Improvements

* JWT-based authentication
* User login and registration system
* More detailed analytics
* Unit and integration testing
* Deployment with public API access

---

## Conclusion

This project demonstrates a structured backend system with clear separation of concerns, role-based access control, and efficient data handling.

The implementation focuses on maintainability, scalability, and real-world backend design practices.
