
Employee Management System - Backend

Tech Stack:
Node.js, Express.js, MongoDB, Mongoose

Setup:
1. npm install
2. cp .env.example .env
3. npm run dev

Server:
http://localhost:5000/api

Features:
- Employee CRUD
- Search by name
- Repository pattern
- Validation & error handling

Tech Stack

Node.js

Express.js

MongoDB

Mongoose

express-validator

dotenv

nodemon

📂 Folder Structure
backend/
├── src/
│   ├── routes/          # API routes
│   ├── controllers/     # HTTP request handling
│   ├── services/        # Business logic
│   ├── repositories/    # Database access (Repository Pattern)
│   ├── models/          # Mongoose schemas
│   ├── validators/      # Request validation rules
│   ├── middleware/      # Error handling middleware
│   ├── config/          # DB connection
│   └── app.js
├── .env.example
├── server.js
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/employee-crud-mern.git
cd employee-crud-mern/backend

2️⃣ Install Dependencies
npm init -y
npm install express mongoose cors dotenv
npm install nodemon --save-dev



3️⃣ Environment Variables
cp .env.example .env


Update .env:

MONGODB_URI=mongodb://localhost:27017/employee-crud
PORT=5000
NODE_ENV=development

4️⃣ Run Backend Server
node server.js


📍 Server runs at:
http://localhost:5000/api

🔗 API Endpoints

| Method | Endpoint                    | Description                                 |
| ------ | -------------------         | ------------------------------------------- |
| GET    | /api/employees              | Get all employees (optional `?search=name`) |
| GET    | /api/employees/:id          | Get employee by ID                          |
| POST   | /api/employees              | Create a new employee                       |
| POST   | /api/employees/bulk-create  | **Bulk create employees**                   |
| PUT    | /api/employees/:id          | Update a single employee                    |
| PUT    | /api/employees/bulk -update | **Bulk update employees**                   |
| DELETE | /api/employees/:id          | Delete employee                             |



🧩 Employee Model 

Field	Type	Constraint

empId	String	Auto-generated, unique
name	String	Required
email	String	Required, unique
phone	String	Required, 10–15 digits
designation	String	Required
department	String	Required
doj	Date	Required
status	String	Active / Inactive

✅ Validation Rules

Backend Validation
Required fields checked
Email format validation
Phone numeric & length validation
Unique email enforced at DB level
Status enum validation

Error Response Format
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "phone", "message": "Phone must be 10–15 digits" }
  ]
}

🧪 HTTP Status Codes

Code	Meaning
201	Created
200	Success
400	Validation Error
404	Not Found
409	Duplicate Email


✅ Backend Checklist

 Repository Pattern implemented
 Clean layered architecture
 Input validation
 Meaningful error responses
 MongoDB integration



 ------------------------------------------------------------------------------
 
 
 Database Setup & Connection (MongoDB)

1️⃣ Install MongoDB

Install MongoDB Community Server

Install MongoDB Compass (GUI tool)

Ensure MongoDB service is running

Check:

mongod --version

2️⃣ Create Database

MongoDB automatically creates the database when data is inserted.

Example database name:

employeeDB


Example collection:

employees

3️⃣ Install Mongoose (Backend)
npm install mongoose

4️⃣ MongoDB Connection Setup
📁 config/db.js

5️⃣ Environment Variables
📁 .env
MONGO_URI=mongodb://127.0.0.1:27017/employeeDB
PORT=5000


🔐 .env is used to keep sensitive data secure.

6️⃣ Connect DB in Server File
📁 server.js


7️⃣ Verify Connection

Start backend:

npx nodemon server.js


Check terminal:

MongoDB Connected Successfully


Open MongoDB Compass → database & collections will appear after first insert.