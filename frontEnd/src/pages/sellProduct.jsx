import React, { useState, useEffect } from 'react';
import Navbar from './components/navBar';
import SellerProductCard from './components/sellerProductCard';
import ProductForm from './components/createProduct';
import.meta.env.VITE_BACKEND_URL;

const SellProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('');

  // Get current logged-in username
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUsername(user.username || '');
  }, []);

  // Fetch only current user's products from dummy API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        // Dummy API endpoint - fetch products by username
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/route/product/seller/${user.username}`);
        const data = await response.json();
        // setProducts(data);
        // setFilteredProducts(data);

        setProducts(data.products || []);
        setFilteredProducts(data.products || []);

      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUsername) {
      fetchProducts();
    }
  }, [currentUsername]);

  // Handle search and filter
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceFilter.min && product.price <= priceFilter.max;
      return matchesSearch && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, priceFilter, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePriceFilter = (min, max) => {
    setPriceFilter({ min, max: max === Infinity ? Infinity : max });
  };

  // Create new product
  const handleCreateProduct = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Create FormData for multipart/form-data (file upload)
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('quantity', formData.quantity);
      data.append('image', formData.image); // ✅ File object
      data.append('sellerUsername', user.username);

      const response = await fetch('https://incubyte-assignment.onrender.com/route/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          // Don't set Content-Type header - browser will set it automatically
        },
        body: data,
      });

      if (!response.ok) throw new Error('Failed to create product');

      const responseData = await response.json();
      const newProduct = responseData.product || responseData;
      setProducts([...products, newProduct]);
      setShowForm(false);
      alert('Product created successfully!');
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Failed to create product');
    }
  };

  // Update product
  const handleUpdateProduct = async (formData) => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('quantity', formData.quantity);
      
      // Only add image if a new file is selected
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      const productId = editingProduct._id || editingProduct.id;
      const response = await fetch(`https://incubyte-assignment.onrender.com/route/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });

      if (!response.ok) throw new Error('Failed to update product');

      const updatedProduct = await response.json();
      const updatedProductId = updatedProduct.product?._id || updatedProduct.product?.id || updatedProduct._id || updatedProduct.id;
      setProducts(products.map(p => {
        const pId = p._id || p.id;
        return pId === productId ? (updatedProduct.product || updatedProduct) : p;
      }));
      setEditingProduct(null);
      setShowForm(false);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`https://incubyte-assignment.onrender.com/route/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to delete product');
        }

        setProducts(products.filter(p => {
          const pId = p._id || p.id;
          return pId !== productId;
        }));
        alert('Product deleted successfully!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert(`Failed to delete product: ${err.message}`);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar onSearch={handleSearch} onPriceFilter={handlePriceFilter} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">My Products</h1>
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              ➕ Add New Product
            </button>
          </div>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            key={editingProduct?.id || editingProduct?._id || 'new-product'}
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onClose={handleCloseForm}
          />
        )}

        {loading ? (
          <div className="text-center text-gray-600">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-12">
            <p>No products found. {!searchTerm && priceFilter.max === Infinity ? 'Create your first product!' : 'Try a different search or filter.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <SellerProductCard
                key={product._id || product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellProduct;