const express = require('express');
const router = express.Router();
const { cities, brandCities } = require('../data/mockData');

// GET all cities
router.get('/cities', (req, res) => {
  try {
    const brandId = req.query.brand;
    
    if (brandId) {
      // Get cities for a specific brand
      const brandCityIds = brandCities
        .filter(bc => bc.brand_id === parseInt(brandId))
        .map(bc => bc.city_id);
      
      const brandCities_list = cities.filter(city => brandCityIds.includes(city.id));
      
      return res.json({
        status: 'success',
        data: brandCities_list
      });
    }
    
    // Get all cities
    res.json({
      status: 'success',
      data: cities
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET city by ID
router.get('/cities/:id', (req, res) => {
  try {
    const city = cities.find(c => c.id === parseInt(req.params.id));
    
    if (!city) {
      return res.status(404).json({
        status: 'error',
        message: 'City not found'
      });
    }
    
    res.json({
      status: 'success',
      data: city
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
