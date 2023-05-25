import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import axios from "axios";

const MyComponent = () => {
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const {productId} = useParams();

  // Get All Project and Save it to data
  useEffect(() => {
    axios.get('https://localhost:7294/api/Product')
    .then(response => setData(response.data))
    .catch(error => console.log(error));
    }, []);

  // Get the one Project which will display and save it to product
  useEffect(() => {
      if (data.length > 0) {
        const selectedProduct = data.find((p) => p.sequences === productId);
        setProduct(selectedProduct);
      }
    }, [data, productId]);


    // Test button Rout
    const [currentProjectId, setCurrentProjectId] = useState(1);
    // Button Right 
    const handleNextProject = () => {
      const nextProjectId = currentProjectId === data.length ? 1 : currentProjectId + 1;
      setCurrentProjectId(nextProjectId);
    };
    // Button Left 
    const handlePreviousProject = () => {
      const previousProjectId = currentProjectId === 1 ? data.length : currentProjectId - 1;
      setCurrentProjectId(previousProjectId);
    };

    // No URL params : set "/scan/2" 
    if (productId === undefined) {
      // Route parameter is empty, navigate to "scan/1"
      return <Navigate to="/scan/2" replace />;
    }

  return (
    <div>
      {/* Test button Rout */}
      <h1>Title</h1>
      <button onClick={handlePreviousProject}><Link to={`/scan/${currentProjectId}`}>previous</Link></button>
      <button onClick={handleNextProject}><Link to={`/scan/${currentProjectId}`}>Next</Link></button>

      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  }

export default MyComponent;