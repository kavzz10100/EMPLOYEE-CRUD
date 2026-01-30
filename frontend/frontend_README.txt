
Employee Management System - Frontend

Tech Stack:
React.js, Axios, CSS

Setup:
1. npm install
2. npm start

App URL:
http://localhost:3000

Features:
- Employee list & search
- Add/Edit/Delete employee
- Detail modal
- Form validation


frontend/
├── src/
│   ├── components/    # Reusable components (Form, Modal, Table)
│   ├── pages/         # Employee List, Form, Detail views
│   ├── services/      # API service calls
│   ├── hooks/         # Custom hooks
│   ├── App.jsx
│   └── index.css
├── .env.example
├── package.json
└── README.md

-----------------------------------------------------------------------------------------------------------------------------------
⚙️ Installation & Setup
1️⃣ Navigate to Frontend
cd employeeSystem/frontend

2️⃣ Install Dependencies
npx create-react-app frontend
cd frontend
npm install react-icons
npm install axios react-router-dom react-toastify
npm install axios

Start Frontend
npm start


📍 Application runs at:
http://localhost:3000
------------------------------------------------------------------------------------------------------------------------------
📄 Pages & Components
🧑 Employee List Page

Search bar (case-insensitive)
Employee table
View / Edit / Delete actions
Add Employee button
------------------------------------------------------------------------------------------------------------------------------------
📝 Employee Form

Add & Edit modes
Pre-filled values during edit
Save & Cancel buttons
Disabled submit until valid
---------------------------------------------------------------------------------------------------------------------------------------------------
👁 Employee Detail View

Read-only data display
Close (X) button
Edit option


✅ Frontend Validation

Required fields highlighted
Email format validation
Phone number validation (10–15 digits)
Inline error messages
Submit button disabled until form valid

---------------------------------------------------------------------------------------------------------------------------------------------------

🔌 API Integration Example
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const getEmployees = (search) =>
  API.get(`/employees?search=${search}`);

🎨 UI/UX Features

Responsive layout
Modal-based forms
success/error messages
Hover effects & clean spacing

-------------------------------------------------------------------------------------------------------------------------------------------------
✅ Frontend Checklist

 CRUD operations working
 Search functionality
 Form validations
 Detail modal
 API integration
 Responsive UI
