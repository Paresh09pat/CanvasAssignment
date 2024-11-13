// src/App.js
import React, { useState } from 'react';
import SearchPage from './SearchPage';
import CanvasEditor from './CanvasEditor';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage ? (
        <CanvasEditor imageUrl={selectedImage} />
      ) : (
        <SearchPage onImageSelect={setSelectedImage} />
      )}
    </div>
  );
};

export default App;
