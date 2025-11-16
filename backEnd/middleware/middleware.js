import jwt from 'jsonwebtoken';

// ✅ Verify JWT token and attach user info to request
export const authMiddleware = (req, res, next) => {
  try {
    // ✅ Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        message: 'No token provided. Please login.' 
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Attach user info to request object
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired. Please login again.' 
      });
    }
    return res.status(401).json({ 
      message: 'Invalid token' 
    });
  }
};