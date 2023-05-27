import React, { useState } from 'react';
import '../assets/styles/Card.css';
import  TestImage from '../assets/images/testPicture.jpg';
import ScanItem from './page_components/ScanItem';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 



export default function Card(props){
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
	setIsFlipped(!isFlipped);
  };

  return (
	<div>
		<MobileView>
			<div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
				<div className="card-inner">
					<div className="card-front">

						<h2>{props.productName}</h2>
						<img src={TestImage} width={200} height={200}/>

						
						
					</div>

					<div className="card-back">
							<h3>Back Side</h3>
							<p>{props.description}</p>
							<p> ID is: {props.sequence}</p>

					</div>

				</div>
			
			</div>
		</MobileView>
	</div>
  );
};

//export default Card;
