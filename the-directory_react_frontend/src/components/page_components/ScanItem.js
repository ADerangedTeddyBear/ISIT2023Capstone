import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import '../../assets/styles/ScanItem.css';

import { Link } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";
import { useSearchParams } from 'react-router-dom';
    
export default function ScanItem(props){
     const [searchParams, setSearchParams] = useSearchParams();
     const [query, setQuery] = useState(searchParams.get('query'));

    return (
        <div>
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
                            {(setSearchParams({ filter: `active ${props.itemName}`}))}
                            {console.log(searchParams)}

                <div className="w3-container MobileScanItem" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="w3-card-4 w3-border MobileScanItem">
                        <header className="w3-container w3-white">
                            <h1 style={{fontSize: '6vw'}}>{props.itemName}</h1>
                        </header>
                        <div style={{fontSize: '3vw'}}>
                            <div className="w3-container">
                                <p style={{overflow: 'auto', height: '150px'}}>{props.itemDescription}</p>
                            </div>
                            {/* <br></br> */}
                            <div className="w3-container">
                                <img
                                className='itemImage'
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