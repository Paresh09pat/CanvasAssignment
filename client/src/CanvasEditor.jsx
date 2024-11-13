import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric'; // Explicitly import fabric.js

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    // Create and initialize the Fabric.js canvas
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#fff',
    });
    setCanvas(newCanvas);

    // Set background image if imageUrl is provided
    if (imageUrl) {
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
          console.log("Background image loaded:", imageUrl);
        },
        { crossOrigin: 'anonymous' }
      );
    }

    // Clean up on unmount
    return () => {
      newCanvas.dispose();
      setCanvas(null);
    };
  }, [imageUrl]);

  // Function to add text to the canvas
  const addText = () => {
    if (!canvas) {
      console.error("Canvas is not initialized yet.");
      return;
    }

    try {
      const text = new fabric.Textbox("Your Caption", {
        left: 100,
        top: 100,
        fontSize: 30,
        fill: '#000',
        editable: true,
      });

      canvas.add(text); // Add text to canvas
      canvas.setActiveObject(text); // Set text as active object
      canvas.renderAll(); // Render canvas to show the text

      console.log("Text added to canvas:", text);
    } catch (error) {
      console.error("Error adding text:", error);
    }
  };

  // Function to add shapes to the canvas
  const addShape = (shapeType) => {
    if (!canvas) {
      console.error("Canvas is not initialized yet.");
      return;
    }

    let shape;
    try {
      switch (shapeType) {
        case 'rectangle':
          shape = new fabric.Rect({ left: 150, top: 150, width: 100, height: 50, fill: 'blue' });
          break;
        case 'circle':
          shape = new fabric.Circle({ left: 200, top: 200, radius: 50, fill: 'red' });
          break;
        case 'triangle':
          shape = new fabric.Triangle({ left: 250, top: 250, width: 100, height: 100, fill: 'green' });
          break;
        default:
          return;
      }
      canvas.add(shape);
      canvas.renderAll();
      console.log(`Shape ${shapeType} added to canvas.`);
    } catch (error) {
      console.error("Error adding shape:", error);
    }
  };

  // Function to download the canvas content as an image
  const downloadImage = () => {
    if (!canvas) {
      console.error("Canvas is not initialized yet.");
      return;
    }

    try {
      const dataUrl = canvas.toDataURL({ format: 'png' });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'modified-image.png';
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      <h2>Canvas Editor</h2>
      <canvas ref={canvasRef} style={{ border: '1px solid #000' }}></canvas>
      <div style={{ marginTop: '20px' }}>
        <button onClick={addText} disabled={!canvas}>Add Text</button>
        <button onClick={() => addShape('rectangle')} disabled={!canvas}>Add Rectangle</button>
        <button onClick={() => addShape('circle')} disabled={!canvas}>Add Circle</button>
        <button onClick={() => addShape('triangle')} disabled={!canvas}>Add Triangle</button>
        <button onClick={downloadImage} disabled={!canvas}>Download Image</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
