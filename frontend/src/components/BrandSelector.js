import React, { useState, useEffect } from 'react';
import './Selector.css';

const BrandSelector = ({ onSelect, selectedBrand }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/brands');
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selected = brands.find(b => b.id === selectedId);
    onSelect(selected || null);
  };

  if (loading) {
    return <div className="dropdown-group">Loading brands...</div>;
  }

  return (
    <div className="dropdown-group">
      <label className="dropdown-label">Select a Brand</label>
      <select 
        className="dropdown-select"
        onChange={handleChange}
        value={selectedBrand ? selectedBrand.id : ''}
      >
        <option value="">-- Choose a Brand --</option>
        {brands.map(brand => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandSelector;
