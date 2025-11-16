// ...existing code...
import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Product from '../models/productSchema.js';
import { authMiddleware } from '../middleware/middleware.js';

const router = express.Router();

// Multer (memory storage) with 5MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Helper: upload buffer to Cloudinary
const uploadBufferToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'sweet-shop/products', resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ message: 'Products fetched successfully', products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// GET products by seller username (public)
router.get('/seller/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const products = await Product.find({ sellerUsername: username }).sort({ createdAt: -1 });
    res.json({ message: `Products from ${username}`, products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching seller products', error: err.message });
  }
});

// CREATE product (protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const sellerUsername = req.user?.username || req.body.sellerUsername;

    if (!name || !description || !price || quantity === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (parseInt(quantity, 10) < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1 for new products' });
    }

    let imageUrl = null;
    if (req.file && req.file.buffer) {
      try {
        const result = await uploadBufferToCloudinary(req.file.buffer);
        imageUrl = result.secure_url || result.url;
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return res.status(400).json({ message: 'Image upload failed' });
      }
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: imageUrl,
      sellerUsername,
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
});

// UPDATE product (protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (quantity !== undefined) product.quantity = parseInt(quantity, 10);

    if (req.file && req.file.buffer) {
      try {
        const result = await uploadBufferToCloudinary(req.file.buffer);
        product.image = result.secure_url || result.url;
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return res.status(400).json({ message: 'Image upload failed' });
      }
    }

    product.updatedAt = Date.now();
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// DELETE product (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

// PURCHASE product (protected) - reduce quantity
router.post('/:id/purchase', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const buyQuantity = parseInt(quantity, 10);

    if (!buyQuantity || buyQuantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.quantity < buyQuantity) return res.status(400).json({ message: 'Insufficient stock available' });

    product.quantity -= buyQuantity;
    await product.save();
    res.json({ message: 'Purchase successful', newQuantity: product.quantity, product });
  } catch (err) {
    console.error('Purchase error:', err);
    res.status(500).json({ message: 'Error processing purchase', error: err.message });
  }
});

export default router;
// ...existing code...