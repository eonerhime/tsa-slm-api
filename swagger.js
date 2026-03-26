const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Library Management System API",
      version: "1.0.0",
      description:
        "A RESTful API for managing a school library system — books, authors, students, and library attendants, including borrowing and returning of books.",
    },
    servers: [
      {
        url: "http://localhost:3100",
        description: "Local development server",
      },
    ],
    components: {
      schemas: {
        Author: {
          type: "object",
          properties: {
            _id: { type: "string", example: "69c56e688ca4260ef6077457" },
            name: { type: "string", example: "Michael Thomas Bottle" },
            bio: {
              type: "string",
              example: "Author of over 20 award winning educational materials",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateAuthorBody: {
          type: "object",
          required: ["name", "bio"],
          properties: {
            name: { type: "string", example: "Michael Thomas Bottle" },
            bio: {
              type: "string",
              example: "Author of over 20 award winning educational materials",
            },
          },
        },
        UpdateAuthorBody: {
          type: "object",
          properties: {
            name: { type: "string", example: "Michael Thomas Bottle" },
            bio: { type: "string", example: "Updated bio text" },
          },
        },

        Student: {
          type: "object",
          properties: {
            _id: { type: "string", example: "69c5537d4f666544157194b7" },
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", example: "jane.doe@example.com" },
            studentId: { type: "string", example: "S123456" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateStudentBody: {
          type: "object",
          required: ["name", "email", "studentId"],
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", example: "jane.doe@example.com" },
            studentId: { type: "string", example: "S123456" },
          },
        },
        UpdateStudentBody: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", example: "jane.doe@example.com" },
          },
        },

        LibraryAttendant: {
          type: "object",
          properties: {
            _id: { type: "string", example: "69c5886108902feba5d493f2" },
            name: { type: "string", example: "John Doe" },
            staffId: { type: "string", example: "LA12345" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateAttendantBody: {
          type: "object",
          required: ["name", "staffId"],
          properties: {
            name: { type: "string", example: "John Doe" },
            staffId: { type: "string", example: "LA12345" },
          },
        },
        UpdateAttendantBody: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jane Doe" },
            staffId: { type: "string", example: "LA12345" },
          },
        },

        Book: {
          type: "object",
          properties: {
            _id: { type: "string", example: "69c58221b08141f31380689f" },
            title: { type: "string", example: "Things Coming Together" },
            isbn: { type: "string", example: "9780435905255" },
            author: {
              type: "array",
              items: { $ref: "#/components/schemas/Author" },
            },
            status: {
              type: "string",
              enum: ["IN", "OUT"],
              example: "IN",
            },
            borrowedBy: {
              oneOf: [
                { $ref: "#/components/schemas/Student" },
                { type: "string", nullable: true },
              ],
            },
            issuedBy: {
              oneOf: [
                { $ref: "#/components/schemas/LibraryAttendant" },
                { type: "string", nullable: true },
              ],
            },
            receivedBy: {
              oneOf: [
                { $ref: "#/components/schemas/LibraryAttendant" },
                { type: "string", nullable: true },
              ],
            },
            returnedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            dueDate: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateBookBody: {
          type: "object",
          required: ["title", "isbn", "author"],
          properties: {
            title: { type: "string", example: "Things Coming Together" },
            isbn: { type: "string", example: "9780435905255" },
            author: {
              type: "array",
              items: { type: "string" },
              example: ["69c56e688ca4260ef6077457"],
            },
          },
        },
        UpdateBookBody: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              example: "Things Come Together - Updated",
            },
          },
        },
        BorrowBookBody: {
          type: "object",
          required: ["studentId", "attendantId", "dueDate"],
          properties: {
            studentId: {
              type: "string",
              example: "69c5537d4f666544157194b7",
            },
            attendantId: {
              type: "string",
              example: "69c5886108902feba5d493f2",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              example: "2026-04-05T00:00:00.000Z",
            },
          },
        },
        ReturnBookBody: {
          type: "object",
          required: ["studentId", "attendantId", "returnedAt"],
          properties: {
            studentId: {
              type: "string",
              example: "69c5537d4f666544157194b7",
            },
            attendantId: {
              type: "string",
              example: "69c5886108902feba5d493f2",
            },
            returnedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-04T10:30:00.000Z",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Resource not found" },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            message: { type: "string", example: "Operation successful" },
          },
        },
      },
    },
    paths: {
      // ───────────────── AUTHORS ─────────────────
      "/api/authors/new": {
        post: {
          tags: ["Authors"],
          summary: "Create a new author",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateAuthorBody" },
              },
            },
          },
          responses: {
            201: {
              description: "Author created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Author" },
                },
              },
            },
            400: {
              description: "Name and bio are required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/authors": {
        get: {
          tags: ["Authors"],
          summary: "Get all authors",
          responses: {
            200: {
              description: "List of all authors",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Author" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/authors/{id}": {
        get: {
          tags: ["Authors"],
          summary: "Get a single author by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c56e688ca4260ef6077457",
            },
          ],
          responses: {
            200: {
              description: "Author found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Author" },
                },
              },
            },
            404: {
              description: "Author not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Authors"],
          summary: "Update an author by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c56e688ca4260ef6077457",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateAuthorBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Author updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Author" },
                },
              },
            },
            400: {
              description: "Name or bio is required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Author not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Authors"],
          summary: "Delete an author by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c56e688ca4260ef6077457",
            },
          ],
          responses: {
            200: {
              description: "Author deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            404: {
              description: "Author not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      // ───────────────── STUDENTS ─────────────────
      "/api/students/new": {
        post: {
          tags: ["Students"],
          summary: "Create a new student",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateStudentBody" },
              },
            },
          },
          responses: {
            201: {
              description: "Student created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Student" },
                },
              },
            },
            400: {
              description: "Name, email, and student ID are required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/students": {
        get: {
          tags: ["Students"],
          summary: "Get all students",
          responses: {
            200: {
              description: "List of all students",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Student" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/students/{id}": {
        get: {
          tags: ["Students"],
          summary: "Get a single student by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5537d4f666544157194b7",
            },
          ],
          responses: {
            200: {
              description: "Student found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Student" },
                },
              },
            },
            404: {
              description: "Student not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Students"],
          summary: "Update a student by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5537d4f666544157194b7",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateStudentBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Student updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Student" },
                },
              },
            },
            400: {
              description: "Name and email are required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Student not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Students"],
          summary: "Delete a student by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5537d4f666544157194b7",
            },
          ],
          responses: {
            200: {
              description: "Student deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            404: {
              description: "Student not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      // ───────────────── ATTENDANTS ─────────────────
      "/api/attendants/new": {
        post: {
          tags: ["Library Attendants"],
          summary: "Create a new library attendant",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateAttendantBody" },
              },
            },
          },
          responses: {
            201: {
              description: "Library attendant created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LibraryAttendant" },
                },
              },
            },
            400: {
              description: "Name and staff ID are required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/attendants": {
        get: {
          tags: ["Library Attendants"],
          summary: "Get all library attendants",
          responses: {
            200: {
              description: "List of all library attendants",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/LibraryAttendant" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/attendants/{id}": {
        get: {
          tags: ["Library Attendants"],
          summary: "Get a single library attendant by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5886108902feba5d493f2",
            },
          ],
          responses: {
            200: {
              description: "Library attendant found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LibraryAttendant" },
                },
              },
            },
            404: {
              description: "Library attendant not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Library Attendants"],
          summary: "Update a library attendant by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5886108902feba5d493f2",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateAttendantBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Library attendant updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LibraryAttendant" },
                },
              },
            },
            400: {
              description: "Name and staff ID are required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Library attendant not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Library Attendants"],
          summary: "Delete a library attendant by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c5886108902feba5d493f2",
            },
          ],
          responses: {
            200: {
              description: "Library attendant deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            404: {
              description: "Library attendant not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      // ───────────────── BOOKS ─────────────────
      "/api/books/new": {
        post: {
          tags: ["Books"],
          summary: "Create a new book",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateBookBody" },
              },
            },
          },
          responses: {
            201: {
              description: "Book created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Book" },
                },
              },
            },
            400: {
              description:
                "Title, ISBN, and author are required / Invalid author ID",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/books": {
        get: {
          tags: ["Books"],
          summary: "Get all books",
          description:
            "Returns all books with populated author, borrowedBy, and issuedBy fields.",
          responses: {
            200: {
              description: "List of all books",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Book" },
                  },
                },
              },
            },
            500: {
              description: "Server error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/books/{id}": {
        get: {
          tags: ["Books"],
          summary: "Get a single book by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c58221b08141f31380689f",
            },
          ],
          responses: {
            200: {
              description: "Book found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Book" },
                },
              },
            },
            404: {
              description: "Book not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Books"],
          summary: "Update a book by ID",
          description: "Only the book title can be updated.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c58221b08141f31380689f",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateBookBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Book updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Book" },
                },
              },
            },
            400: {
              description: "Title is required",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Book not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Books"],
          summary: "Delete a book by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c58221b08141f31380689f",
            },
          ],
          responses: {
            200: {
              description: "Book deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            404: {
              description: "Book not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/books/{id}/borrow": {
        post: {
          tags: ["Books"],
          summary: "Borrow a book",
          description:
            "Marks a book as borrowed (status: OUT). The book must currently be IN.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c58221b08141f31380689f",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BorrowBookBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Book borrowed successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            400: {
              description: "Book is already borrowed / missing required fields",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Book not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/api/books/{id}/return": {
        post: {
          tags: ["Books"],
          summary: "Return a book",
          description:
            "Marks a book as returned (status: IN). The book must currently be OUT.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "69c58221b08141f31380689f",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ReturnBookBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Book returned successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" },
                },
              },
            },
            400: {
              description: "Book is not borrowed",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            404: {
              description: "Book not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
