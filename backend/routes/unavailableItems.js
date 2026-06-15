const express = require('express');
const router = express.Router();
const {
  unavailableItems,
  locations,
  brands,
  foodItems
} = require('../data/mockData');

// POST - Get unavailable items for a location (Bulk API)
router.post('/unavailable-items', (req, res) => {
  try {
    const { restaurant_brand, location } = req.body;
    
    // Validate input
    if (!restaurant_brand || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'restaurant_brand and location parameters are required'
      });
    }
    
    // Find the location
    const locationData = locations.find(l => l.id === location);
    
    if (!locationData) {
      return res.status(404).json({
        status: 'error',
        message: 'Location not found'
      });
    }
    
    // Verify brand matches location
    if (locationData.brand_id !== restaurant_brand) {
      return res.status(400).json({
        status: 'error',
        message: 'Brand does not match the location'
      });
    }
    
    // Get brand name
    const brand = brands.find(b => b.id === restaurant_brand);
    
    // Get unavailable items for this location
    const unavailable = unavailableItems.filter(item => item.location_id === location);
    
    // Enrich unavailable items with full details
    const enrichedItems = unavailable.map(item => {
      const foodItem = foodItems.find(f => f.id === item.item_id);
      return {
        item_id: item.item_id,
        name: foodItem ? foodItem.name : 'Unknown Item',
        reason: item.reason,
        expected_availability: item.expected_availability
      };
    });
    
    res.json({
      status: 'success',
      data: {
        brand: brand.name,
        location: locationData.name,
        unavailable_items: enrichedItems,
        total_count: enrichedItems.length
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// GET - Get unavailable items for a location (Alternative endpoint)
router.get('/unavailable-items', (req, res) => {
  try {
    const { restaurant_brand, location } = req.query;
    
    // Validate input
    if (!restaurant_brand || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'restaurant_brand and location query parameters are required'
      });
    }
    
    // Find the location
    const locationData = locations.find(l => l.id === parseInt(location));
    
    if (!locationData) {
      return res.status(404).json({
        status: 'error',
        message: 'Location not found'
      });
    }
    
    // Verify brand matches location
    if (locationData.brand_id !== parseInt(restaurant_brand)) {
      return res.status(400).json({
        status: 'error',
        message: 'Brand does not match the location'
      });
    }
    
    // Get brand name
    const brand = brands.find(b => b.id === parseInt(restaurant_brand));
    
    // Get unavailable items for this location
    const unavailable = unavailableItems.filter(item => item.location_id === parseInt(location));
    
    // Enrich unavailable items with full details
    const enrichedItems = unavailable.map(item => {
      const foodItem = foodItems.find(f => f.id === item.item_id);
      return {
        item_id: item.item_id,
        name: foodItem ? foodItem.name : 'Unknown Item',
        reason: item.reason,
        expected_availability: item.expected_availability
      };
    });
    
    res.json({
      status: 'success',
      data: {
        brand: brand.name,
        location: locationData.name,
        unavailable_items: enrichedItems,
        total_count: enrichedItems.length
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
