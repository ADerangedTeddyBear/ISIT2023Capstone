import React, { useState } from 'react';
import '../assets/styles/Card.css';
import ScanItem from './page_components/ScanItem';


export default function Card(props){
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
	setIsFlipped(!isFlipped);
  };

  return (
	<div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
		<div className="card-inner">
			<div className="card-front">
				
				
			</div>

			<div className="card-back">
					<h3>Back Side</h3>
					<p>This is the back of the card.</p>
			</div>

		</div>
  	
	</div>
  );
};

//export default Card;
