const express = require('express');
const router = express.Router();
const { brands } = require('../data/mockData');

// GET all brands
router.get('/brands', (req, res) => {
  try {
    res.json({
      status: 'success',
      data: brands
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET brand by ID
router.get('/brands/:id', (req, res) => {
  try {
    const brand = brands.find(b => b.id === parseInt(req.params.id));
    
    if (!brand) {
      return res.status(404).json({
        status: 'error',
        message: 'Brand not found'
      });
    }
    
    res.json({
      status: 'success',
      data: brand
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
