import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import '../../assets/styles/ScanItem.css';

import { Link } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

export default function ScanItem(props){
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
                            Link: {props.itemLink}
                        </div>
                    </div>
                </div>
                <br></br>
            </BrowserView>

            {/* Mobile */}
            <MobileView>
                <div className="w3-container MobileScanItem" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="w3-card-4 w3-border MobileScanItem">
                        <header className="w3-container w3-white">
                            <h1 style={{fontSize: '6vw'}}>{props.itemName}</h1>
                        </header>
                        <div style={{fontSize: '3vw'}}>
                            <div className="w3-container">
                                <p style={{overflow: 'auto', height: '150px'}}>{props.itemDescription}</p>
                            </div>
                            <br></br>
                            <div className="w3-container">
                                Link: {props.itemLink}
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </MobileView>
        </div>
    )
}