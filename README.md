# 📚 Student Library Management System API

A backend RESTful API built with Node.js, Express, and MongoDB for managing a student library system. This API handles books, authors, students, and library attendants, including borrowing and returning of books.

---

## 🚀 Features

- 📖 Book management (CRUD)
- ✍️ Author management (CRUD)
- 👨‍🎓 Student management (CRUD)
- 🧑‍💼 Library attendant management (CRUD)
- 🔄 Borrow and return book functionality
- 📅 Due date and return tracking
- 🔗 Relational data using MongoDB references
- ⚙️ RESTful API design

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

---

## 📂 Project Structure

slm-api/
│
├── config/
│ └── database.js
│
├── controllers/
│ ├── books.controller.js
│ ├── authors.controller.js
│ ├── student.controller.js
│ └── library-attendant.controller.js
│
├── models/
│ ├── books.model.js
│ ├── authors.model.js
│ ├── student.model.js
│ └── library-attendant.model.js
│
├── routes/
│ ├── books.route.js
│ ├── authors.route.js
│ ├── student.route.js
│ └── library-attendant.route.js
│
├── .env
├── .env.local
├── .gitignore
├── index.js
├── README.md
└── package.json
