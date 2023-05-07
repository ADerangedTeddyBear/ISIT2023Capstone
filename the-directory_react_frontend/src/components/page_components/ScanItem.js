import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
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
                <div className="w3-container w3-mobile" style={{marginTop: '15px', marginBotto: '15px'}}>
                    <div className="w3-card-4 w3-border">
                        <header className="w3-container w3-white">
                            <h1>{props.itemName}</h1>
                        </header>
                        <div className="w3-container">
                            <p>{props.itemDescription}</p>
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
                <div className="w3-container" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="w3-card-4 w3-border">
                        <header className="w3-container w3-white">
                            <h1 style={{fontSize: '7vw'}}>{props.itemName}</h1>
                        </header>
                        <div style={{fontSize: '4vw'}}>
                            <div className="w3-container">
                                <p>{props.itemDescription}</p>
                            </div>
                            <br></br>
                            <div className="w3-container">
                                <img
                                src= {props.itemImageName}
                                />
                                
                                {/* ImageName: {props.itemImageName} */}
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </MobileView>
        </div>
    )
}