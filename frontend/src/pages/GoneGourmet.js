import React, { useState, useEffect } from 'react';
import './GoneGourmet.css';
import BrandSelector from '../components/BrandSelector';
import CitySelector from '../components/CitySelector';
import LocationSelector from '../components/LocationSelector';
import UnavailableItemsCard from '../components/UnavailableItemsCard';

const GoneGourmet = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [unavailableItems, setUnavailableItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset city and location when brand changes
  useEffect(() => {
    setSelectedCity(null);
    setSelectedLocation(null);
    setUnavailableItems(null);
  }, [selectedBrand]);

  // Reset location when city changes
  useEffect(() => {
    setSelectedLocation(null);
    setUnavailableItems(null);
  }, [selectedCity]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = async () => {
    if (!selectedBrand || !selectedCity || !selectedLocation) {
      setError('Please select brand, city, and location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/unavailable-items`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            restaurant_brand: selectedBrand.id,
            location: selectedLocation.id
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch unavailable items');
      }

      const data = await response.json();
      setUnavailableItems(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gone-gourmet-container">
      <header className="header">
        <h1>Gone Gourmet</h1>
        <p>Find Unavailable Items at Your Favorite Restaurants</p>
      </header>

      <div className="selection-section">
        <div className="section-title">Select Brand and City</div>

        <BrandSelector 
          onSelect={handleBrandSelect}
          selectedBrand={selectedBrand}
        />

        {selectedBrand && (
          <CitySelector 
            brandId={selectedBrand.id}
            onSelect={handleCitySelect}
            selectedCity={selectedCity}
          />
        )}

        {selectedBrand && selectedCity && (
          <LocationSelector 
            brandId={selectedBrand.id}
            cityId={selectedCity.id}
            onSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        )}

        {error && <div className="error-message">⚠️ {error}</div>}

        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedBrand || !selectedCity || !selectedLocation || loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>

      {unavailableItems && (
        <UnavailableItemsCard items={unavailableItems} />
      )}
    </div>
  );
};

export default GoneGourmet;
