import React, { useState } from 'react';
import './UnavailableItemsCard.css';

const UnavailableItemsCard = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.unavailable_items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="unavailable-items-card">
      <div className="card-header">
        <div className="card-title">Unavailable Items</div>
        <div className="card-location">
          <strong>{items.brand}</strong> - {items.location}
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="items-container">
        {filteredItems.length > 0 ? (
          <ul className="items-list">
            {filteredItems.map((item, index) => (
              <li key={index} className="item-row">
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-reason">Reason: {item.reason}</div>
                  <div className="item-availability">
                    Expected: {new Date(item.expected_availability).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            {items.unavailable_items.length === 0 
              ? '✅ No unavailable items found' 
              : '❌ No results found'}
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="item-count">Total: {filteredItems.length}/{items.unavailable_items.length}</span>
      </div>
    </div>
  );
};

export default UnavailableItemsCard;
