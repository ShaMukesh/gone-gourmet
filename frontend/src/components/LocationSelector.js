import React, { useState, useEffect } from 'react';
import './Selector.css';

const LocationSelector = ({ brandId, cityId, onSelect, selectedLocation }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brandId && cityId) {
      fetchLocations();
    }
  }, [brandId, cityId]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/locations?brand=${brandId}&city=${cityId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      setLocations(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selected = locations.find(l => l.id === selectedId);
    onSelect(selected || null);
  };

  if (loading) {
    return <div className="dropdown-group">Loading locations...</div>;
  }

  return (
    <div className="dropdown-group">
      <label className="dropdown-label">Select a Location</label>
      <select 
        className="dropdown-select"
        onChange={handleChange}
        value={selectedLocation ? selectedLocation.id : ''}
      >
        <option value="">-- Choose a Location --</option>
        {locations.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
