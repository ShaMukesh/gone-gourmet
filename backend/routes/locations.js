const express = require('express');
const router = express.Router();
const { locations } = require('../data/mockData');

// GET locations by brand and city
router.get('/locations', (req, res) => {
  try {
    const { brand, city } = req.query;
    
    if (!brand || !city) {
      return res.status(400).json({
        status: 'error',
        message: 'Brand and city parameters are required'
      });
    }
    
    const filteredLocations = locations.filter(
      loc => loc.brand_id === parseInt(brand) && loc.city_id === parseInt(city)
    );
    
    res.json({
      status: 'success',
      data: filteredLocations
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET location by ID
router.get('/locations/:id', (req, res) => {
  try {
    const location = locations.find(l => l.id === parseInt(req.params.id));
    
    if (!location) {
      return res.status(404).json({
        status: 'error',
        message: 'Location not found'
      });
    }
    
    res.json({
      status: 'success',
      data: location
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
