// src/SearchPage.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, client_id: '036UPOxTxPl7GiayWr2mKex4bt_-pCVssNwW9erWrJw' }
      });
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {images.map((image) => (
          <div key={image.id} className='comdiv'>
            <div className='maindiv'>
              <img
                src={image.urls.small}
                alt={image.alt_description}
                onClick={() => onImageSelect(image.urls.full)}
              />
              <button>Add Captions</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
