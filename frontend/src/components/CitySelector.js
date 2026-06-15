import React, { useState, useEffect } from 'react';
import './Selector.css';

const CitySelector = ({ brandId, onSelect, selectedCity }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brandId) {
      fetchCities();
    }
  }, [brandId]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cities?brand=${brandId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      setCities(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selected = cities.find(c => c.id === selectedId);
    onSelect(selected || null);
  };

  if (loading) {
    return <div className="dropdown-group">Loading cities...</div>;
  }

  return (
    <div className="dropdown-group">
      <label className="dropdown-label">Select a City</label>
      <select 
        className="dropdown-select"
        onChange={handleChange}
        value={selectedCity ? selectedCity.id : ''}
      >
        <option value="">-- Choose a City --</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
