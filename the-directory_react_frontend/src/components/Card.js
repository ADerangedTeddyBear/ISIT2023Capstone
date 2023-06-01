import React, { useState } from 'react';
import '../assets/styles/Card.css';
import TestImage from '../assets/images/testPicture.jpg';
import '../../src/assets/styles/W3.css'
const Card = ({ product }) => {
  const { productName, imageAccessNumber, description, sequence } = product;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
        {/* <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
      {console.log(product)}

      <div className="card-front">
        <h2>{productName}</h2>
        <img
          src={product.imageAccessNumber}
          alt="Product Image"
          className="image-resize" // Apply CSS class for image resizing
        />
      </div>
      <div className="card-back">
        <p>{description}</p>
      </div>
    </div> */}

{/* My version below */}
    <div className="card-grid">

<div className={`card ${isFlipped ? "flip" : ""}`}>

  <div className="front" onClick={flipCard}>
    <h2 className='cardHeaderBorder'>{productName}</h2>
    <div className='cardContentBorder'>
    <img
          src={product.imageAccessNumber}
          alt="Product Image"
          className="image-resize" // Apply CSS class for image resizing
        />
    </div>

    </div>

  <div className="back" onClick={flipCard}>
  <h2 className='cardHeaderBorder'>{productName}</h2>
    <div className="backInfo, cardContentBorder">
      <div className="backTextWrapper">
      <p>{description}</p>
      </div>
    </div>
  </div>

</div>

</div>
    </>

  );
};

export default Card;
