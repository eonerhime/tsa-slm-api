# 📚 School Library Management System API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing a school library system — handling books, authors, students, and library attendants, including borrowing and returning of books.

---

## ✨ Features

| Feature       | Description                                           |
| ------------- | ----------------------------------------------------- |
| 📖 Books      | Full CRUD operations for book management              |
| ✍️ Authors    | Full CRUD operations for author management            |
| 👨‍🎓 Students   | Full CRUD operations for student management           |
| 🧑‍💼 Attendants | Full CRUD operations for library attendant management |
| 🔄 Borrowing  | Borrow and return book functionality                  |
| 📅 Tracking   | Due date and return date tracking                     |
| 🔗 Relations  | Relational data using MongoDB references              |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Config:** dotenv
- **Docs:** Swagger UI (swagger-ui-express, swagger-jsdoc)

---

## 📂 Project Structure

```
slm-api/
│
├── config/
│   └── database.js               # MongoDB connection setup
│
├── controllers/
│   ├── books.controller.js       # Book business logic
│   ├── authors.controller.js     # Author business logic
│   ├── student.controller.js     # Student business logic
│   └── attendant.controller.js  # Attendant business logic
│
├── models/
│   ├── books.model.js            # Book schema & model
│   ├── authors.model.js          # Author schema & model
│   ├── student.model.js          # Student schema & model
│   └── attendant.model.js       # Attendant schema & model
│
├── routes/
│   ├── books.route.js            # Book endpoints
│   ├── authors.route.js          # Author endpoints
│   ├── student.route.js          # Student endpoints
│   └── attendant.route.js       # Attendant endpoints
│
├── swagger.js                    # Swagger API documentation config
├── .env                          # Environment variables for MongoDB Atlas
├── .env.local                    # Local environment overrides
├── .gitignore
├── index.js                      # App entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/slm-api.git
   cd slm-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local .env
   ```

   Update `.env.local` with your MongoDB Compass connection string:

   ```env
   PORT=3100
   MONGO_URI=mongodb://localhost:27017/slm-api
   ```

4. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

   The API will be running at `http://localhost:3100`.

   Interactive API docs (Swagger UI) will be available at `http://localhost:3100/api-docs`.

---

## 📖 API Documentation

Interactive API documentation is available via Swagger UI once the server is running:

**`http://localhost:3100/api-docs`**

---

## 📡 API Endpoints

### Books

| Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/api/books`     | Get all books     |
| `GET`    | `/api/books/:id` | Get a single book |
| `POST`   | `/api/books/new` | Create a new book |
| `PUT`    | `/api/books/:id` | Update a book     |
| `DELETE` | `/api/books/:id` | Delete a book     |

### Authors

| Method   | Endpoint           | Description         |
| -------- | ------------------ | ------------------- |
| `GET`    | `/api/authors`     | Get all authors     |
| `GET`    | `/api/authors/:id` | Get a single author |
| `POST`   | `/api/authors/new` | Create a new author |
| `PUT`    | `/api/authors/:id` | Update an author    |
| `DELETE` | `/api/authors/:id` | Delete an author    |

### Students

| Method   | Endpoint            | Description          |
| -------- | ------------------- | -------------------- |
| `GET`    | `/api/students`     | Get all students     |
| `GET`    | `/api/students/:id` | Get a single student |
| `POST`   | `/api/students/new` | Create a new student |
| `PUT`    | `/api/students/:id` | Update a student     |
| `DELETE` | `/api/students/:id` | Delete a student     |

### Library Attendants

| Method   | Endpoint              | Description            |
| -------- | --------------------- | ---------------------- |
| `GET`    | `/api/attendants`     | Get all attendants     |
| `GET`    | `/api/attendants/:id` | Get a single attendant |
| `POST`   | `/api/attendants/new` | Create a new attendant |
| `PUT`    | `/api/attendants/:id` | Update an attendant    |
| `DELETE` | `/api/attendants/:id` | Delete an attendant    |

### Borrowing

| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| `POST` | `/api/books/:id/borrow` | Borrow a book |
| `POST` | `/api/books/:id/return` | Return a book |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed to Emo Onerhime.
