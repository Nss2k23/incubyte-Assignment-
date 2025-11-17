import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navBar';
import SweetCard from './components/sweetCard';

const Home = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch ALL products
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchSweets = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/route/product`);
        const data = await response.json();

        setSweets(data.products || []);
        setFilteredSweets(data.products || []);
      } catch (err) {
        console.error('Failed to fetch sweets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSweets();
  }, [BACKEND_URL]);

  // Search & Filter
  useEffect(() => {
    let filtered = sweets.filter((sweet) => {
      const matchesSearch = sweet.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPrice =
        sweet.price >= priceFilter.min && sweet.price <= priceFilter.max;

      return matchesSearch && matchesPrice;
    });

    setFilteredSweets(filtered);
  }, [searchTerm, priceFilter, sweets]);

  const handleSearch = (term) => setSearchTerm(term);

  const handlePriceFilter = (min, max) => {
    setPriceFilter({ min, max });
  };

  // Update UI quantity
  const handlePurchase = (sweetId, newQuantity) => {
    setSweets((prev) =>
      prev.map((sweet) =>
        (sweet._id || sweet.id) === sweetId
          ? { ...sweet, quantity: newQuantity }
          : sweet
      )
    );
  };

  // 🔥 API call for purchase — MOVED HERE
  const handlePurchaseRequest = async (sweetId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/route/product/${sweetId}/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ quantity: 1 }),
        }
      );

      if (!response.ok) throw new Error('Purchase failed');

      const data = await response.json();

      handlePurchase(sweetId, data.newQuantity);

      return { success: true, newQuantity: data.newQuantity };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar onSearch={handleSearch} onPriceFilter={handlePriceFilter} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Delicious Sweets
        </h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading sweets...</div>
        ) : filteredSweets.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No sweets found matching your criteria.
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
              {filteredSweets.map((sweet) => (
                <SweetCard
                  key={sweet._id || sweet.id}
                  sweet={sweet}
                  onPurchaseRequest={handlePurchaseRequest} // parent callback
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
