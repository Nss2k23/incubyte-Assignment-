import React, { useState } from 'react';

const SweetCard = ({sweet, onPurchase }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(sweet.quantity);
  const isOutOfStock = quantity === 0;

  const handlePurchase = async () => {
    if (isOutOfStock || isProcessing) return;

    setIsProcessing(true);

    try {
      // API call to purchase product
      const sweetId = sweet._id || sweet.id;
      const response = await fetch(`http://localhost:5000/route/product/${sweetId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          quantity: 1, // Purchase 1 item
        }),
      });

      if (!response.ok) {
        throw new Error('Purchase failed');
      }

      const data = await response.json();
      
      // ✅ Update local state with new quantity
      setQuantity(data.newQuantity);
      
      // ✅ Call parent callback
      onPurchase(sweetId, data.newQuantity);
      
      alert('Purchase successful!');
    } catch (err) {
      console.error('Error purchasing product:', err);
      alert('Failed to complete purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={sweet.image || 'https://via.placeholder.com/200'}
          alt={sweet.name}
          className="w-full h-full object-cover transition-all duration-300"
          style={isOutOfStock ? { filter: 'blur(1px)' } : {}}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-amber-500 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg z-10 backdrop-blur-sm">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-purple-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{sweet.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-10">{sweet.description}</p>

        {/* Seller Info */}
        <p className="text-xs text-gray-500 mb-3">
          Sold by: <span className="font-semibold text-gray-700">{sweet.sellerUsername || 'Unknown'}</span>
        </p>

        {/* Price and Quantity */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-purple-600">₹{formatPrice(sweet.price)}</span>
          <span className={`text-sm font-medium ${isOutOfStock ? 'text-amber-600' : 'text-green-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `${quantity} left`}
          </span>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={isOutOfStock || isProcessing}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isOutOfStock || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
          }`}
        >
          {isProcessing ? '⏳ Processing...' : isOutOfStock ? 'Out of Stock' : '🛒 Purchase'}
        </button>
      </div>
    </div>
  );
};

export default SweetCard;