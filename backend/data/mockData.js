// Mock Data for Gone Gourmet

const brands = [
  { id: 1, name: "Arby's Restaurant Group" },
  { id: 2, name: "Buffalo Wild Wings" },
  { id: 3, name: "Sandwich Hut" }
];

const cities = [
  { id: 1, name: "NEW YORK" },
  { id: 2, name: "CHICAGO" },
  { id: 3, name: "GENEVA" },
  { id: 4, name: "HAMBURG" },
  { id: 5, name: "ROME" }
];

const brandCities = [
  { brand_id: 1, city_id: 1 },
  { brand_id: 1, city_id: 2 },
  { brand_id: 1, city_id: 3 },
  { brand_id: 2, city_id: 1 },
  { brand_id: 2, city_id: 2 },
  { brand_id: 3, city_id: 3 },
  { brand_id: 3, city_id: 4 }
];

const locations = [
  // Arby's - New York
  { id: 1, brand_id: 1, city_id: 1, name: "Arby's - Times Square" },
  { id: 2, brand_id: 1, city_id: 1, name: "Arby's - Central Park" },
  { id: 3, brand_id: 1, city_id: 1, name: "Arby's - Brooklyn" },
  
  // Arby's - Chicago
  { id: 4, brand_id: 1, city_id: 2, name: "Arby's - Downtown Chicago" },
  { id: 5, brand_id: 1, city_id: 2, name: "Arby's - Millennium Park" },
  
  // Arby's - Geneva
  { id: 6, brand_id: 1, city_id: 3, name: "Arby's - Geneva" },
  
  // Buffalo Wild Wings - New York
  { id: 7, brand_id: 2, city_id: 1, name: "Buffalo Wild Wings - Midtown" },
  { id: 8, brand_id: 2, city_id: 1, name: "Buffalo Wild Wings - Upper East" },
  
  // Buffalo Wild Wings - Chicago
  { id: 9, brand_id: 2, city_id: 2, name: "Buffalo Wild Wings - Loop" },
  
  // Sandwich Hut - Geneva
  { id: 10, brand_id: 3, city_id: 3, name: "Sandwich Hut - Geneva" },
  
  // Sandwich Hut - Hamburg
  { id: 11, brand_id: 3, city_id: 4, name: "Sandwich Hut - Hamburg" }
];

const foodItems = [
  // Arby's items
  { id: 101, name: "Roast Beef Sandwich", brand_id: 1 },
  { id: 102, name: "Market Fresh Peach Lemonade", brand_id: 1 },
  { id: 103, name: "Curly Fries", brand_id: 1 },
  { id: 104, name: "Turkey Sandwich", brand_id: 1 },
  { id: 105, name: "Cheddar Roast Beef", brand_id: 1 },
  
  // Buffalo Wild Wings items
  { id: 201, name: "Boneless Wings", brand_id: 2 },
  { id: 202, name: "Buffalo Chicken Dip", brand_id: 2 },
  { id: 203, name: "Spicy Garlic Parmesan", brand_id: 2 },
  { id: 204, name: "Thai Sauce Wings", brand_id: 2 },
  { id: 205, name: "Mozzarella Sticks", brand_id: 2 },
  
  // Sandwich Hut items
  { id: 301, name: "Italian Sub", brand_id: 3 },
  { id: 302, name: "Turkey Club", brand_id: 3 },
  { id: 303, name: "Veggie Sandwich", brand_id: 3 },
  { id: 304, name: "Tuna Salad", brand_id: 3 }
];

const unavailableItems = [
  // Arby's - Times Square
  { id: 1001, location_id: 1, item_id: 101, reason: "Out of Stock", expected_availability: "2026-06-16" },
  { id: 1002, location_id: 1, item_id: 102, reason: "Supplier Delay", expected_availability: "2026-06-17" },
  
  // Arby's - Central Park
  { id: 1003, location_id: 2, item_id: 104, reason: "Equipment Maintenance", expected_availability: "2026-06-16" },
  { id: 1004, location_id: 2, item_id: 105, reason: "Ingredient Shortage", expected_availability: "2026-06-18" },
  
  // Arby's - Brooklyn
  { id: 1005, location_id: 3, item_id: 103, reason: "Out of Stock", expected_availability: "2026-06-15" },
  
  // Buffalo Wild Wings - Midtown
  { id: 2001, location_id: 7, item_id: 201, reason: "Out of Stock", expected_availability: "2026-06-16" },
  { id: 2002, location_id: 7, item_id: 204, reason: "Delivery Delay", expected_availability: "2026-06-17" },
  
  // Buffalo Wild Wings - Upper East
  { id: 2003, location_id: 8, item_id: 202, reason: "Inventory Count", expected_availability: "2026-06-15" },
  
  // Sandwich Hut - Geneva
  { id: 3001, location_id: 10, item_id: 302, reason: "Out of Stock", expected_availability: "2026-06-16" },
  { id: 3002, location_id: 10, item_id: 304, reason: "Supplier Delay", expected_availability: "2026-06-19" }
];

module.exports = {
  brands,
  cities,
  brandCities,
  locations,
  foodItems,
  unavailableItems
};
