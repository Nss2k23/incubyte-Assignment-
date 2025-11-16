import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserMenu = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null); // ✅ Reference to menu container

  // ✅ Get first letter of username for avatar
  const firstLetter = username.charAt(0).toUpperCase();

  // ✅ Check current page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const isSellPage = location.pathname === '/sell';

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Handle logout - clear storage and navigate to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ✅ Handle sell product - navigate to sell page
  const handleSellProduct = () => {
    navigate('/sell');
    setIsOpen(false);
  };

  // ✅ Handle buy product - navigate to home page
  const handleBuyProduct = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* ✅ User Icon - Shows first letter of username */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center hover:bg-purple-700 transition"
      >
        {firstLetter}
      </button>

      {/* ✅ Dropdown Menu - Shows when icon is clicked */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          
          {/* ✅ User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-800">{username}</p>
          </div>

          {/* ✅ Buy Product Button - Only visible on Sell page */}
          {isSellPage && (
            <button
              onClick={handleBuyProduct}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 font-medium transition flex items-center gap-2"
            >
              🛒 Buy Product
            </button>
          )}

          {/* ✅ Sell Product Button - Only visible on Home page */}
          {isHomePage && (
            <button
              onClick={handleSellProduct}
              className="w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 font-medium transition flex items-center gap-2"
            >
              📦 Sell Product
            </button>
          )}

          {/* ✅ Logout Button - Always visible */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium transition border-t border-gray-200 flex items-center gap-2"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;