import React from 'react';
import '../../assets/styles/Nav.css';
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
                <Link className = 'link_item' to="/">Home</Link>
                <Link  className = 'link_item' to="/scan">Scan</Link>
                <Link  className = 'link_item' to="/scanner">Scanner</Link>
            </MobileView>
        </div>
    )
}