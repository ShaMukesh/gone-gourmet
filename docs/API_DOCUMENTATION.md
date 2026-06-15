# Gone Gourmet API Documentation

## Overview

The Gone Gourmet API provides endpoints for retrieving information about restaurant brands, cities, locations, and unavailable items at specific restaurant locations.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Brands

#### Get All Brands
- **Endpoint:** `GET /brands`
- **Description:** Retrieve all available restaurant brands
- **Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Arby's Restaurant Group"
    },
    {
      "id": 2,
      "name": "Buffalo Wild Wings"
    }
  ]
}
```

#### Get Brand by ID
- **Endpoint:** `GET /brands/:id`
- **Description:** Retrieve a specific brand by ID
- **Parameters:**
  - `id` (path parameter): Brand ID
- **Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Arby's Restaurant Group"
  }
}
```

### 2. Cities

#### Get All Cities
- **Endpoint:** `GET /cities`
- **Description:** Retrieve all cities
- **Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "NEW YORK"
    },
    {
      "id": 2,
      "name": "CHICAGO"
    }
  ]
}
```

#### Get Cities by Brand
- **Endpoint:** `GET /cities?brand=:brand_id`
- **Description:** Retrieve cities associated with a specific brand
- **Query Parameters:**
  - `brand` (required): Brand ID
- **Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "NEW YORK"
    },
    {
      "id": 2,
      "name": "CHICAGO"
    }
  ]
}
```

#### Get City by ID
- **Endpoint:** `GET /cities/:id`
- **Description:** Retrieve a specific city by ID
- **Parameters:**
  - `id` (path parameter): City ID
- **Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "NEW YORK"
  }
}
```

### 3. Locations

#### Get Locations by Brand and City
- **Endpoint:** `GET /locations?brand=:brand_id&city=:city_id`
- **Description:** Retrieve restaurant locations for a specific brand in a city
- **Query Parameters:**
  - `brand` (required): Brand ID
  - `city` (required): City ID
- **Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "brand_id": 1,
      "city_id": 1,
      "name": "Arby's - Times Square"
    },
    {
      "id": 2,
      "brand_id": 1,
      "city_id": 1,
      "name": "Arby's - Central Park"
    }
  ]
}
```

#### Get Location by ID
- **Endpoint:** `GET /locations/:id`
- **Description:** Retrieve a specific location by ID
- **Parameters:**
  - `id` (path parameter): Location ID
- **Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "brand_id": 1,
    "city_id": 1,
    "name": "Arby's - Times Square"
  }
}
```

### 4. Unavailable Items (Bulk API)

#### Get Unavailable Items (POST)
- **Endpoint:** `POST /unavailable-items`
- **Description:** Retrieve unavailable items for a specific restaurant location
- **Request Body:**
```json
{
  "restaurant_brand": 1,
  "location": 1
}
```
- **Response:**
```json
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
    ],
    "total_count": 2
  }
}
```

#### Get Unavailable Items (GET)
- **Endpoint:** `GET /unavailable-items?restaurant_brand=:brand_id&location=:location_id`
- **Description:** Retrieve unavailable items using GET method
- **Query Parameters:**
  - `restaurant_brand` (required): Brand ID
  - `location` (required): Location ID
- **Response:** Same as POST endpoint

## Error Handling

### 400 Bad Request
```json
{
  "status": "error",
  "message": "restaurant_brand and location parameters are required"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Location not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Example Requests

### cURL Examples

#### Get all brands
```bash
curl -X GET http://localhost:5000/api/brands
```

#### Get cities for brand 1
```bash
curl -X GET "http://localhost:5000/api/cities?brand=1"
```

#### Get locations for brand 1 in city 1
```bash
curl -X GET "http://localhost:5000/api/locations?brand=1&city=1"
```

#### Get unavailable items
```bash
curl -X POST http://localhost:5000/api/unavailable-items \
  -H "Content-Type: application/json" \
  -d '{"restaurant_brand": 1, "location": 1}'
```

### JavaScript/Fetch Examples

```javascript
// Get all brands
fetch('http://localhost:5000/api/brands')
  .then(res => res.json())
  .then(data => console.log(data));

// Get unavailable items
fetch('http://localhost:5000/api/unavailable-items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    restaurant_brand: 1,
    location: 1
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Performance Considerations

1. **Multiple Location Queries**: The API efficiently handles queries for multiple locations
2. **Caching**: Consider implementing caching for frequently requested data
3. **Rate Limiting**: No rate limiting is implemented in this learning project
4. **Pagination**: Not implemented; consider for large datasets

## Future Enhancements

- Pagination for large result sets
- Authentication and authorization
- Rate limiting
- Database integration (currently uses mock data)
- Advanced filtering options
- Batch operations for multiple locations
- WebSocket support for real-time updates
