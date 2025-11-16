// ...existing code...
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/cloudinary.js'; // ensures Cloudinary config runs

dotenv.config();

import authRoute from './routes/authRoute.js';
import productRoute from './routes/product.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err.message));

// Routes
app.use('/route/auth', authRoute);
app.use('/route/product', productRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server running',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured',
  });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
//   console.log(`📡 Health: http://localhost:${PORT}/api/health`);
// });
// // ...existing code...


// export default app;

// // 👉 Prevent server from starting during tests
// if (process.env.NODE_ENV !== "test") {
//   app.listen(5000, () => console.log("Server running on port 5000"));
// }

export default app;

// 👉 Start server normally (NOT during test)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 Health: http://localhost:${PORT}/api/health`);
  });
}