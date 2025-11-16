🍬 Sweet Store – MERN Inventory & Shop Application

A full-stack MERN application for managing sweets, stock, purchases, authentication, and user interactions.
Built with responsiveness, real-world features, and smooth UI/UX in mind.

🌍 Live Preview

Frontend (React App): [Add Your Vercel URL Here]

Backend API: [Add Your Render / Cyclic URL Here]

🔐 Demo Credentials (Optional)

You can provide demo login credentials here later.

Email: demo@example.com
Password: ****** 

🚀 Features
🔑 Authentication System

JWT-based login & signup

Password hashing with bcrypt

Protected routes for product creation, update, delete

📦 Product Management

Add / Edit / Delete sweets

Image upload using Cloudinary

Fetch products by seller

Public listing of all sweets

🛒 Purchase Handling

Simple purchase flow

Stock quantity decreases automatically

Prevents negative stock

🎨 Modern UI/UX

Built with React + TailwindCSS

Fully responsive

Soft gradients & elegant design

🧠 AI Tools I Used During Development

I actively used AI tools to speed up development, improve code quality, and debug complex issues:

🔹 ChatGPT

Debugged Express/MongoDB issues

Helped with JWT logic

Cleaned up React components

Suggested folder structures and architecture

Helped write & fix backend tests

🔹 GitHub Copilot

Auto-completed repetitive JSX components

Generated CRUD handlers

Suggested better variable names & refactoring

🔹 Cursor AI

Refactored code across multiple files

Improved front-end UI structure

Helped with TailwindCSS spacing and responsive layouts

I used AI mainly as a coding assistant, not as a code generator — I still controlled and reviewed all final code.

🛠 Tech Stack
Frontend

React (Vite)

React Router

TailwindCSS

Lucide Icons

Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Multer (file upload)

Cloudinary (image hosting)

Database

MongoDB Atlas

Deployment

Frontend → Vercel

Backend → Render / Cyclic (choose one)

Database → MongoDB Atlas

📁 Folder Structure (Backend)
backend/
 ├── config/
 │   └── cloudinary.js
 ├── middleware/
 │   └── middleware.js
 ├── models/
 │   ├── userSchema.js
 │   └── productSchema.js
 ├── routes/
 │   ├── authRoute.js
 │   └── product.js
 ├── index.js
 ├── jest.config.js (if testing enabled)
 ├── test/ (if testing enabled)
 └── package.json

⚙️ Environment Variables
Backend .env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

Frontend .env
VITE_API_URL=https://your-backend-url.com

▶ Running the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🧪 API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/route/auth/signup	Register new user
POST	/route/auth/login	Login user
Products
Method	Endpoint	Description
GET	/route/product	Fetch all products
GET	/route/product/seller/:username	Fetch seller-wise products
POST	/route/product	Create product (protected)
PUT	/route/product/:id	Update product
DELETE	/route/product/:id	Delete product
POST	/route/product/:id/purchase	Purchase item
🧪 Testing (Optional Section)

If you plan to add Jest tests later, you can fill this section.

npm test

📌 Future Upgrades (Optional Ideas)

Admin dashboard

Order history

Multiple images upload

Role-based user permissions

Dark mode