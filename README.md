# Gone Gourmet - Unavailable Items Bulk API

A learning project implementing a Retail Analysis Platform (RAP) system to efficiently query unavailable items across multiple restaurant locations.

## Project Overview

This application helps the RAP system quickly find which items are not available in stores by creating a bulk API that communicates between RAP and IDP (Item Data Provider) systems.

## Features

✅ **Backend API** - Retrieve unavailable items by brand and location  
✅ **Frontend UI** - Dynamic dropdowns for brand/city selection  
✅ **Search Functionality** - Filter unavailable items in real-time  
✅ **Multi-location Support** - Query multiple stores simultaneously  
✅ **Error Handling** - Comprehensive error responses  

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React, Axios
- **Database**: Mock data (PostgreSQL-ready schema)
- **API**: RESTful JSON

## Project Structure

```
gone-gourmet/
├── backend/                 # Express.js API server
│   ├── routes/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/               # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
└── docs/                  # API documentation
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## API Endpoints

### 1. Get All Brands
**GET** `/api/brands`
```json
{
  "brands": [
    { "id": 1, "name": "Arby's Restaurant Group" },
    { "id": 2, "name": "Buffalo Wild Wings" }
  ]
}
```

### 2. Get Cities by Brand
**GET** `/api/cities?brand=1`
```json
{
  "cities": [
    { "id": 1, "name": "NEW YORK" },
    { "id": 2, "name": "CHICAGO" }
  ]
}
```

### 3. Get Locations by Brand & City
**GET** `/api/locations?brand=1&city=1`
```json
{
  "locations": [
    { "id": 1, "name": "Arby's - Times Square" },
    { "id": 2, "name": "Arby's - Central Park" }
  ]
}
```

### 4. Get Unavailable Items (Bulk API)
**POST** `/api/unavailable-items`
```json
Request:
{
  "restaurant_brand": 1,
  "location": 1
}

Response:
{
  "status": "success",
  "data": {
    "brand": "Arby's Restaurant Group",
    "location": "Arby's - Times Square",
    "unavailable_items": [
      {
        "item_id": 101,
        "name": "Roast Beef Sandwich",
        "reason": "Out of Stock",
        "expected_availability": "2026-06-16"
      },
      {
        "item_id": 102,
        "name": "Market Fresh Peach Lemonade",
        "reason": "Supplier Delay",
        "expected_availability": "2026-06-17"
      }
    ]
  }
}
```

## Frontend Features

### Brand Selection
- Dropdown menu with all available restaurant brands
- Triggers city list update on selection

### City Selection
- Dynamically populated based on selected brand
- Shows available cities for that brand

### Location Selection
- Shows restaurant locations within the selected city
- Updates dynamically based on brand and city

### Results Display
- Card showing unavailable items
- Each item displays name and unavailability reason
- Real-time search functionality

### Search Functionality
- Filter unavailable items as you type
- Case-insensitive search
- Displays "No results found" when no matches

## Database Schema

### Brands Table
```sql
CREATE TABLE brands (
  id INT PRIMARY KEY,
  name VARCHAR(255) UNIQUE
);
```

### Cities Table
```sql
CREATE TABLE cities (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
```

### Brand_Cities Table
```sql
CREATE TABLE brand_cities (
  brand_id INT,
  city_id INT,
  PRIMARY KEY (brand_id, city_id)
);
```

### Locations Table
```sql
CREATE TABLE locations (
  id INT PRIMARY KEY,
  brand_id INT,
  city_id INT,
  name VARCHAR(255),
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
```

### Food Items Table
```sql
CREATE TABLE food_items (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  brand_id INT,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);
```

### Unavailable Items Table
```sql
CREATE TABLE unavailable_items (
  id INT PRIMARY KEY,
  location_id INT,
  item_id INT,
  reason VARCHAR(255),
  expected_availability DATE,
  FOREIGN KEY (location_id) REFERENCES locations(id),
  FOREIGN KEY (item_id) REFERENCES food_items(id)
);
```

## Error Handling

The API handles various error scenarios:

- **400 Bad Request** - Missing or invalid parameters
- **404 Not Found** - Brand, city, or location not found
- **500 Internal Server Error** - Server-side errors

## Testing

You can test the API using:
- **Postman** - Import the API endpoints
- **cURL** - Command line requests
- **Frontend UI** - User interface testing

## Learning Objectives

This project demonstrates:
- RESTful API design
- Express.js backend development
- React frontend development
- Component state management
- API integration from frontend
- Dynamic data filtering
- Error handling best practices

## Notes

- This is a learning project and will be deleted after completion
- Mock data is used; no real database is configured
- Cross-Origin Resource Sharing (CORS) is enabled for frontend-backend communication

## License

Learning Project - To be deleted after completion
