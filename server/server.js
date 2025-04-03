// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Mock product data
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: `This is a description for Product ${i + 1}`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  category: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty'][Math.floor(Math.random() * 5)],
  inStock: Math.random() > 0.3
}));

// API endpoint for paginated products
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  res.json({
    page,
    limit,
    total: products.length,
    totalPages: Math.ceil(products.length / limit),
    products: paginatedProducts
  });
});

// API endpoint for a single product
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.query.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});