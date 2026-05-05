# KioskMC — Backend

Express.js REST API serving product and order data for the KioskMC kiosk application. Handles authentication via JWT and communicates with a local MongoDB database.

## Tech Stack

- **Node.js** + **Express.js**
- **Mongoose** — MongoDB ODM
- **jsonwebtoken** — JWT authentication
- **dotenv** — environment variable management

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/login` | — | Login, returns JWT token |
| `GET` | `/products` | — | All products (basic info) |
| `GET` | `/productsAll` | — | All products (full info with ingredients) |
| `GET` | `/productsName` | — | Product names only |
| `GET` | `/productsName/:name` | — | Product by name |
| `GET` | `/productsName/:name/ingredients` | — | Product ingredients |
| `GET` | `/edit/:name` | — | Product details for edit view |
| `GET` | `/orders/info` | — | All orders |
| `POST` | `/orders` | — | Create new order |
| `PUT` | `/products/update/:id` | JWT | Update product data |

## Project Structure

```
App.js                  # Entry point — server setup
DatabaseConnection.js   # MongoDB connection
Endpoints/
  Login.js              # POST /auth/login
  ShowProducts.js
  ShowProductsAll.js
  ShowProductsName.js
  ShowProductsNameIngredients.js
  ShowProductDefaultName.js
  ShowProductsNameInfo.js
  EnterOrderInfo.js
  ShowOrders.js
  UpdateProduct.js
Middleware/
  authMiddleware.js     # JWT verification
Schemas/
  ProductsSchema.js
  OrderSchema.js
seed.js                 # Database seeder
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB running locally on port `27017`

### Install & run

```bash
npm install
node App.js
```

Server starts on **port 3030** (configurable via `.env`).

### Seed the database

```bash
node seed.js
```

Clears the `products` collection and inserts sample menu items.

## Environment Variables

Create a `.env` file in this directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/KioskMC
JWT_SECRET=your_secret_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=3030
```

## Authentication

`POST /auth/login` with `{ username, password }` returns a JWT token valid for 8 hours.

Protected endpoints require the token in the `Authorization` header:

```
Authorization: Bearer <token>
```
