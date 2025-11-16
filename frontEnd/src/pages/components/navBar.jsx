import React, { useState, useEffect } from 'react';
import UserMenu from './userMenu';

const Navbar = ({ onSearch, onPriceFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState(''); // Changed to store selected filter
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username || 'User');
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handlePriceChange = (e) => {
    const selectedFilter = e.target.value;
    setPriceFilter(selectedFilter);
    
    // Determine min and max based on selected filter
    let min = 0, max = Infinity;
    switch (selectedFilter) {
      case 'under100':
        max = 100;
        break;
      case 'under500':
        max = 500;
        break;
      case 'under1000':
        max = 1000;
        break;
      case 'above2000':
        min = 2000;
        break;
      default:
        break;
    }
    onPriceFilter(min, max); // Send min and max to parent
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* First Row - Logo and User Menu */}
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <div className="flex items-center gap-2 text-2xl font-bold text-purple-600">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4464/4464750.png" 
              alt="Sweet Shop Icon" 
              className="w-8 h-8"
            />
            Sweet Shop
          </div>
          <div className="md:hidden">
            <UserMenu username={username} />
          </div>
        </div>

        {/* Second Row - Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          
          {/* Search Bar */}
          <div className="w-full md:flex-1 md:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search sweets..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Price Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-sm text-gray-600 font-medium">Price:</label>
            <select
              value={priceFilter}
              onChange={handlePriceChange}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="">Select Price Range</option>
              <option value="under100">Under ₹100</option>
              <option value="under500">Under ₹500</option>
              <option value="under1000">Under ₹1000</option>
              <option value="above2000">Above ₹2000</option>
            </select>
          </div>

          {/* User Menu - Hidden on Mobile */}
          <div className="hidden md:block">
            <UserMenu username={username} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;