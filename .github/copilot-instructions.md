# MERN E-Commerce Project Setup

This is a full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

## Project Structure
- `server/`: Node.js/Express backend with MongoDB integration
- `client/`: React frontend application
- Root package.json: Manages both server and client

## Technology Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Redux, Axios
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe & PayPal integration
- **Admin**: Dashboard with product and order management

## Key Features
- Product listing with search and filters
- User authentication (JWT-based)
- Shopping cart management
- Order processing with Stripe & PayPal
- Admin dashboard for managing products and orders
- User reviews and ratings

## Setup Steps
1. Install backend dependencies: `cd server && npm install`
2. Install frontend dependencies: `cd client && npm install`
3. Create `.env` file in server directory with MongoDB URI and API keys
4. Run backend: `npm run server` from root
5. Run frontend: `npm run client` from root
6. Run both concurrently: `npm run dev`

## Environment Variables (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
PAYPAL_CLIENT_ID=your_paypal_client_id
NODE_ENV=development
PORT=5000
```
