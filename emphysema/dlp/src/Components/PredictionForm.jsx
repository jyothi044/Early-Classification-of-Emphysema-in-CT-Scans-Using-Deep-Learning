import React, { useState } from 'react';

const PredictionForm = () => {
    const [prediction, setPrediction] = useState(null);
    const [image, setImage] = useState(null);
  
    const handleFileChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
        setPrediction(data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error state if needed
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Submit</button>
        {prediction && (
          <div>
            <p>Class: {prediction.class}</p>
            <p>Category: {prediction.category}</p>
            <p>Emphysema: {prediction.emphysema}</p>
          </div>
        )}
      </div>
    );
}

export default PredictionForm;
