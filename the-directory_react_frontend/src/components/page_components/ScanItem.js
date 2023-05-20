import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import '../../assets/styles/ScanItem.css';
import testImage from '../../assets/images/testPicture.jpg'

//New temp card css import
import '../../assets/styles/Card.css';


import { Link } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";

    
export default function ScanItem(props){
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    //Flip tracker
    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleClick = () => {
        setIsFlipped(!isFlipped);
      };



    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageUrls((prev) => [...prev, url]);
            });
          });
        });
      }, []);

    return (
        <div>
            {/* Browser */}
            <BrowserView>
                <div className="DesktopScanItem">
                    <div className="w3-card-4 w3-border DesktopScanItem">
                        <header className="w3-container w3-white">
                            <h1 className='DesktopItemName'>{props.itemName}</h1>
                        </header>

                        <div className="w3-container DesktopScanItemDescription">
                            {props.itemDescription}
                        </div>
                        <br></br>
                        <div className="w3-container">
                            imageName: {props.itemImageName}
                        </div>
                    </div>
                </div>
                <br></br>
            </BrowserView>

            {/* Mobile */}
            <MobileView>

    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="card-inner">
                <div className="card-front">


                <header className="w3-container w3-white">
                    <h1 style={{fontSize: '6vw'}}>{props.itemName}</h1>
                </header>
                    <div style={{fontSize: '3vw'}}>
                        <br></br>
                        <div className="w3-container">
                            <img
                            className='itemImage'
                            src = {testImage}                                
                            />
                            
                        </div>
                    </div>                       
                
            </div>

            <div className="card-back">
                <header className="w3-container w3-white">
                    <h1 style={{fontSize: '6vw'}}>{props.itemDescription}</h1>
                </header>
                    {/* <h3 className="w3-container w3-white">{props.description}</h3> */}
                    <p>This is the back of the card.</p>
            </div>

        </div>

    </div>





</MobileView>
           
        </div>
    )
}


//PREVIOUS MOBILE VIEW CODE
 {/* <MobileView>
                <div className="w3-container MobileScanItem" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="w3-card-4 w3-border">
                        <header className="w3-container w3-white">
                            <h1 style={{fontSize: '6vw'}}>{props.itemName}</h1>
                        </header>
                        <div style={{fontSize: '3vw'}}>
                            <div className="MobileScanItemDescription">
                               {props.itemDescription}
                            </div>
                         <br></br> 
                            <div className="w3-container">
                                <img
                                className='itemImage'
                                src = {testImage}
                                // src= {props.itemImageName}
                                
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </MobileView> */}