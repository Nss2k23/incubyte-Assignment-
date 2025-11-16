import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// ✅ Load environment variables
dotenv.config();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Verify configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
  console.warn('⚠️  Cloudinary credentials not fully configured');
} else {
  console.log('✅ Cloudinary configured successfully');
}

export default cloudinary;