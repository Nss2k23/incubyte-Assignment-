# 🍬 Sweet Store – MERN Application

### 🔗 **Live Demo**
- **Frontend:** https://incubyte-assignment-zeta.vercel.app
- **Backend API:** https://incubyte-assignment.onrender.com
- **GitHub Repository:** https://github.com/Nss2k23/incubyte-Assignment-

⚠️ **Note:** The application may take a few minutes to load due to cold start on the hosting server.

---
### 🔐 Demo Credentials 

1) **Username:** Assignment1  
   **Password:** Assignment1  

2) **Username:** Assignment2  
   **Password:** Assignment2  

---
## 📌 1) Project Description
Sweet Store is a full-stack **MERN** application where users can **sell and buy sweets**. Each authenticated user can add, edit, and delete their own products, while also browsing and purchasing sweets added by other users.

This project showcases:
- 🔐 Authentication with JWT & protected routes
- 📦 Inventory management (seller-wise product list, stock updates)
- 🛒 Purchase workflow with real-time stock updates
- 🖼️ Image uploads using Cloudinary
- 🎨 A clean, responsive UI using TailwindCSS
- 👤 Role-based permissions (owners can edit/delete, others can only buy)

This simulates a small real-world e-commerce inventory system with proper access control.

---

## 🛠 2) Tech Stack

### **Frontend**
- React (Vite)
- React Router
- TailwindCSS

### **Backend**
- Node.js + Express
- MongoDB + Mongoose

### **Authentication & Security**
- JWT (Login, Signup, Token Validation)
- bcrypt (Password hashing)

### **File Upload & Storage**
- Multer
- Cloudinary

---

## 🤖 My AI Usage
I used AI tools to speed up development, debug faster, and refine logic—while writing and reviewing all core logic myself.

### **AI Tools Used**
- ChatGPT
- GitHub Copilot
- Cursor AI

### **How AI Helped**
- Assisted in planning backend logic (auth, routes, purchase workflow)
- Helped debug React, Express, and MongoDB errors
- Accelerated repetitive coding tasks (forms, states, CRUD functions)
- Suggested improvements in UI/UX and code structure
- Helped refactor components while maintaining consistency

AI served only as a coding assistant—**not** a code generator. All final logic and implementations were manually reviewed and written by me.

---

## 🔌 3) API Endpoints

### **Authentication**
- **POST** `/route/auth/signup` – Create a new user
- **POST** `/route/auth/login` – Login & receive a JWT

### **Products**
- **GET** `/route/product` – Fetch all sweets
- **GET** `/route/product/seller/:username` – Fetch sweets of a specific seller
- **POST** `/route/product` – Add new sweet *(requires login)*
- **PUT** `/route/product/:id` – Update sweet *(owner only)*
- **DELETE** `/route/product/:id` – Delete sweet *(owner only)*
- **POST** `/route/product/:id/purchase` – Purchase a sweet *(decreases stock)*

---

## 🛠️ 4) How to Run the Project Locally

### **1️⃣ Clone the Repository**
```sh
git clone <your-repo-url>
cd project-folder
```

---

## **2️⃣ Backend Setup**
Navigate to the backend folder:
```sh
cd backend
```

Install backend dependencies:
```sh
npm install
```

Create a `.env` file:
```
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

Start the backend server:
```sh
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

## **3️⃣ Frontend Setup**
Navigate to the frontend folder:
```sh
cd frontend
```

Install frontend dependencies:
```sh
npm install
```

Create a `.env` file:
```
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:
```sh
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

### Screenshots of Final Application

![SS1](./assets/Screenshot%202025-11-18%20032921.png)
![SS2](./assets/Screenshot%202025-11-18%20032913.png)
![SS3](./assets/Screenshot%202025-11-18%20032359.png)
![SS4](./assets/Screenshot%202025-11-18%20032537.png)
![SS5](./assets/Screenshot%202025-11-18%20033317.png)
![SS6](./assets/Screenshot%202025-11-18%20033333.png)

