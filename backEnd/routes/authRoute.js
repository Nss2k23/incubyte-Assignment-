import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const router = express.Router();
console.log("authRoute is mounted");

// ✅ Helper function to create JWT token
const createToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ✅ SIGNUP - Create new user account
router.post('/signup', async (req, res) => {
  console.log("Hitting signup");

  try {
     if (!req.body) {
      return res.status(400).json({
        message: "Missing credentials. Plz fill up both credentials"
      });
    }

    const { username, password } = req.body;

    // Validate input
    // if (!username || !password) {
    //   return res.status(400).json({ 
    //     message: "Please provide username and password" 
    //   });
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Username already exists" 
      });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    // Create token
    const token = createToken(user._id, user.username);

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Error during signup",
      error: err.message
    });
  }
});


// ✅ LOGIN - Authenticate user
router.post('/login', async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        message: "Missing credentials. Plz fill up both credentials"
      });
    }

    const { email, password } = req.body;

    // ✅ Validate input
    // if (!email || !password) {
    //   return res.status(400).json({ 
    //     message: 'Please provide email and password' 
    //   });
    // }

    // ✅ Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        message: '❌ Invalid email or password' 
      });
    }

    // ✅ Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        message: '❌ Invalid email or password' 
      });
    }

    // ✅ Create token
    const token = createToken(user._id, user.username);

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Error during login', 
      error: err.message 
    });
  }
});

export default router;