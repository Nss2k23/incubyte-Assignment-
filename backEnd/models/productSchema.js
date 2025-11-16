import mongoose from 'mongoose';

// ✅ Product Schema - Stores product information
const productSchema = new mongoose.Schema({
  // ✅ Product name
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },

  // ✅ Product description
  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  // ✅ Product price
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },

  // ✅ Stock quantity - Must be at least 1 for new products
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },

  // ✅ Product image URL (from Cloudinary)
  image: {
    type: String,
    default: null,
  },

  // ✅ Seller username - Links to who created the product
  sellerUsername: {
    type: String,
    required: [true, 'Seller username is required'],
    index: true, // ✅ Index for faster queries
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

export default mongoose.model('Product', productSchema);