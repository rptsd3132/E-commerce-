# 🛒 My Mini Amazon

A full-stack e-commerce web application — a smaller version of Amazon — built with React, Node.js, Express, and PostgreSQL. Users can browse products, search, view product details with reviews, add items to a cart, place orders, and submit complaints. Includes secure JWT authentication.

---

## ✨ Features

- **User accounts** — sign up and log in with secure password hashing (bcrypt) and JWT tokens
- **Product catalogue** — browse all products in a responsive grid
- **Search** — instantly filter products by name or description
- **Product detail pages** — view a single product with its reviews and average rating
- **Shopping cart** — add items, change quantities, remove items
- **Checkout & orders** — place real orders saved to the database (with database transactions and automatic stock reduction)
- **Reviews & ratings** — leave a 1–5 star rating and a written review on any product
- **Help Center / Complaints** — submit complaints tied to your account
- **Admin-protected actions** — only admin users can create products
- **Responsive themed UI** — works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React (Vite), inline styling        |
| Backend     | Node.js, Express                    |
| Database    | PostgreSQL                          |
| Auth        | JWT (jsonwebtoken), bcrypt          |
| Other       | pg, cors, dotenv                    |

---

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── controllers/        # Logic for each feature
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── complaintController.js
│   │   └── reviewController.js
│   ├── routes/             # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── complaints.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js         # JWT authentication + admin guard
│   ├── sql/
│   │   ├── schema.sql      # Database tables
│   │   └── seed.sql        # Sample data
│   ├── db.js               # Database connection
│   ├── server.js           # App entry point
│   └── .env                # Secrets (not committed)
│
└── frontend/
    └── src/
        ├── App.jsx          # Main app, navigation, state
        ├── ProductList.jsx  # Product grid + search
        ├── ProductDetail.jsx# Single product + reviews
        ├── Login.jsx
        ├── Signup.jsx
        ├── Cart.jsx
        └── Complaints.jsx
```

---

## 🗄️ Database Tables

- **users** — id, name, email, password (hashed), is_admin, created_at
- **categories** — id, name
- **products** — id, name, description, price, stock, image_url, category_id, created_at
- **reviews** — id, product_id, user_id, rating (1–5), comment, created_at
- **orders** — id, user_id, total, status, created_at
- **order_items** — id, order_id, product_id, quantity, price
- **complaints** — id, user_id, order_id, subject, message, status, created_at

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+) and npm
- PostgreSQL (v16+)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd e-commerce
```

### 2. Set up the database

Create the database and a user, then run the schema and seed files:

```bash
# Create user and database (run inside psql as the postgres admin)
CREATE USER shopuser WITH PASSWORD 'shoppass';
CREATE DATABASE shopdb OWNER shopuser;

# Then load the tables and sample data
psql -h localhost -p 5432 -U shopuser -d shopdb -f backend/sql/schema.sql
psql -h localhost -p 5432 -U shopuser -d shopdb -f backend/sql/seed.sql
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=shopuser
DB_PASSWORD=shoppass
DB_NAME=shopdb
PORT=5000
JWT_SECRET=your_secret_key_here
```

Start the backend:

```bash
node server.js
```

The API runs at **http://localhost:5000**.

### 4. Set up the frontend

In a **separate terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

> **Note:** Both the backend (port 5000) and frontend (port 5173) must be running at the same time.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint            | Description           | Auth |
|--------|---------------------|-----------------------|------|
| POST   | `/api/auth/signup`  | Create an account     | No   |
| POST   | `/api/auth/login`   | Log in, get a token   | No   |

### Products
| Method | Endpoint            | Description           | Auth      |
|--------|---------------------|-----------------------|-----------|
| GET    | `/api/products`     | List all products     | No        |
| GET    | `/api/products/:id` | Get one product       | No        |
| POST   | `/api/products`     | Create a product      | Admin     |

### Orders
| Method | Endpoint            | Description           | Auth      |
|--------|---------------------|-----------------------|-----------|
| POST   | `/api/orders`       | Place an order        | Logged in |
| GET    | `/api/orders/mine`  | Get your orders       | Logged in |

### Reviews
| Method | Endpoint                  | Description              | Auth      |
|--------|---------------------------|--------------------------|-----------|
| GET    | `/api/reviews/:productId` | Get a product's reviews  | No        |
| POST   | `/api/reviews/:productId` | Add a review             | Logged in |

### Complaints
| Method | Endpoint               | Description           | Auth      |
|--------|------------------------|-----------------------|-----------|
| POST   | `/api/complaints`      | Submit a complaint    | Logged in |
| GET    | `/api/complaints/mine` | Get your complaints   | Logged in |

---

## 🔒 Authentication

Protected routes require a JWT token in the request header:

```
Authorization: Bearer <token>
```

The token is obtained at login and stored in the browser. Passwords are never stored in plain text — they are hashed with bcrypt.

---

## 📝 Notes

- Admin users (`is_admin = true`) can create products. To make a user an admin:
  ```bash
  psql -h localhost -p 5432 -U shopuser -d shopdb -c "UPDATE users SET is_admin = true WHERE id = 1;"
  ```
- The `.env` file and `node_modules/` are excluded from Git via `.gitignore`.

---

## 🌱 Possible Future Improvements

- Order history page in the frontend (backend route already exists)
- Product images and image uploads
- Category filtering
- Admin dashboard to manage products and view complaints
- Deployment to a live server

---

## 📄 License

This project was built for learning purposes.

## 👨‍💻 Author

R. P. T. Sandeepa Dilhara (computer engineer and IT undergraduate student )