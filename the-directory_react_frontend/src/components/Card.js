import React, { useState } from 'react';
import '../assets/styles/Card.css';
import TestImage from '../assets/images/testPicture.jpg';
import '../../src/assets/styles/W3.css'
import { BrowserView, MobileView } from 'react-device-detect';
const Card = ({ product }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  //Handles card flipping
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
    {/* Desktop rendering for Card */}
    <BrowserView>
      <div className="card-grid card-Desktop">

        <div className={`card ${isFlipped ? "flip" : ""}`}>

          <div className="front" onClick={flipCard}>
            <h2 className='cardHeaderBorderDesktop'>{product.productName}</h2>
            <img
            src={product.imageAccessNumber}
            alt="Product Image"
            className="image-resize" // Apply CSS class for image resizing
            />
          </div>

          <div className="back" onClick={flipCard}>
            <h2 className='cardHeaderBorderDesktop'>{product.productName}</h2>
            <div className="backInfoDesktop, cardContentBorderDesktop">
              <div className="backTextWrapper">
                <p>{product.description}</p>
                {product.color !== "" && (
                <p>Color:{product.color}</p>
                )}
                {product.price !== "" && (
                <p>Price: {product.price}</p>
                )}
                {product.madeIn !== "" && (
                <p>Made In:{product.madeIn}</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </BrowserView>

    {/* Mobile rendering for Card */}
    <MobileView>
      <div className="card-grid">

        <div className={`card ${isFlipped ? "flip" : ""}`}>

          <div className="front" onClick={flipCard}>
            <h2 className='cardHeaderBorder'>{product.productName}</h2>
            <img
            src={product.imageAccessNumber}
            alt="Product Image"
            className="image-resize" // Apply CSS class for image resizing
            />
          </div>

          <div className="back" onClick={flipCard}>
            <h2 className='cardHeaderBorder'>{product.productName}</h2>
            <div className="backInfo, cardContentBorder">
              <div className="backTextWrapper">
                <p>{product.description}</p>
                {product.color !== "" && (
                <p>Color:{product.color}</p>
                )}
                {product.price !== "" && (
                <p>Price: {product.price}</p>
                )}
                {product.madeIn !== "" && (
                <p>Made In:{product.madeIn}</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </MobileView>
{/* My version below */}
 
    </>

  );
};

export default Card;
