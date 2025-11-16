import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// ✅ User Schema - Stores user account information
const userSchema = new mongoose.Schema({
  // ✅ Username - Unique identifier for seller
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
  },

  // ✅ Email - For contact and login
  // email: {
  //   type: String,
  //   required: [true, 'Email is required'],
  //   unique: true,
  //   match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  // },

  // ✅ Password - Hashed for security
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // ✅ Don't return password by default
  },

  // ✅ Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);