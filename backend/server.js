const express = require('express');
const cors = require('cors');
require('dotenv').config();

const brandsRouter = require('./routes/brands');
const citiesRouter = require('./routes/cities');
const locationsRouter = require('./routes/locations');
const unavailableItemsRouter = require('./routes/unavailableItems');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', brandsRouter);
app.use('/api', citiesRouter);
app.use('/api', locationsRouter);
app.use('/api', unavailableItemsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}/api/docs`);
});
