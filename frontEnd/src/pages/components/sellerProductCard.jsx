import React from 'react';

const SellerProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 bg-purple-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Price and Quantity */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-purple-600">₹{product.price}</span>
          <span className={`text-sm font-medium ${product.quantity === 0 ? 'text-red-600' : 'text-green-600'}`}>
            {product.quantity} in stock
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(product._id || product.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;



