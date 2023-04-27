import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';

import { Link } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

export default function Nav(){
    return (
        <div className='nav_bar'>
            
            {/* Browser */}
            <BrowserView>
                <Link className = 'link_item' to="/">Home</Link>
                <Link  className = 'link_item' to="/scan">Scan</Link>
            </BrowserView>

            {/* Mobile */}
            <MobileView>
            <div className="w3-bar w3-border" style={{fontSize: '5vw'}}>
                <Link className = 'link_item' to="/">Home</Link>
                <Link  className = 'link_item' to="/scan">Scan</Link>
                <Link  className = 'link_item' to="/scanner">Scanner</Link>
            </div>

                {/* <div className="w3-sidebar w3-bar-block">
                    <Link className = 'w3-bar-item w3-button link_item' to="/">Home</Link>
                    <Link  className = 'w3-bar-item w3-button link_item' to="/scan">Scan</Link>
                    <Link  className = 'w3-bar-item w3-button link_item' to="/scanner">Scanner</Link>
                </div> */}


            </MobileView>
        </div>
    )
}