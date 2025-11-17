import React, { useState, useEffect } from 'react';


const ProductForm = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '1',
    image: null,
  });

  const [originalData, setOriginalData] = useState(null); // NEW
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      const initial = {
        name: product.name,
        description: product.description,
        price: String(product.price),
        quantity: String(product.quantity),
        image: null
      };

      setFormData(initial);
      setOriginalData(initial); // NEW: store original state
      setPreview(product.image);
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';

    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = 'Price must be greater than 0';

    const qtyNum = parseInt(formData.quantity, 10);
    if (!product) {
      if (isNaN(qtyNum) || qtyNum < 1)
        newErrors.quantity = 'Quantity must be at least 1 for new products';
    } else {
      if (isNaN(qtyNum) || qtyNum < 0)
        newErrors.quantity = 'Quantity must be 0 or greater';
    }

    if (!product && !formData.image)
      newErrors.image = 'Image is required for new products';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Detect if form has changed from original
  const hasChanges = product
    ? (
        originalData &&
        (
          formData.name !== originalData.name ||
          formData.description !== originalData.description ||
          String(formData.price) !== String(originalData.price) ||
          String(formData.quantity) !== String(originalData.quantity) ||
          formData.image !== null
        )
      )
    : true; // Always true for add product

  const isSubmitDisabled = loading || (product && !hasChanges);

  return (
    <div className="fixed inset-0 bg-purple-50 bg-opacity-95 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl ring-1 ring-purple-200 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="p-6">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-purple-600 hover:text-purple-800 text-2xl disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                step="0.01"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

              {preview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              
              {/* Cancel Button */}
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className={`flex-1 font-semibold py-2 px-4 rounded-lg transition
                  ${loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                  }`}
              >
                Cancel
              </button>

              {/* Add / Update Button */}
              <button
                type="submit"
                disabled={isSubmitDisabled}  // NEW: disable if unchanged
                className={`flex-1 text-white font-semibold py-2 px-4 rounded-lg transition
                  ${
                    isSubmitDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {loading
                  ? product
                    ? "Updating..."
                    : "Adding..."
                  : product
                  ? "Update product"
                  : "Add product"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

