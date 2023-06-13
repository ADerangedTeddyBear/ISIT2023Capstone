import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import qrImg from "../../assets/images/qr-code.png"
import homeImg from "../../assets/images/home-del.png"
import scanImg from "../../assets/images/scan.png"
import styles from "../../assets/styles/MobileNav.module.css";

import { NavLink, Link, useLocation } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

export default function Nav() {
  const { search } = useLocation();

  return (
    <div className='nav_bar'>

      {/* Browser View with text for navigation*/}
      <BrowserView>
        <Link className = 'link_item' to="/">Home</Link>
        <Link  className = 'link_item' to="/scan">Scan</Link>
        <Link  className = 'link_item' to="/desktopdisclaimer">Desktop Instructions</Link>
      </BrowserView>

      {/* Mobile View with icons for buttons to navigate*/}
      <MobileView>
        <div className={styles['container']}>
          <ul className={styles['mobileNavLinks']}>
            <NavLink to={"/"}
            style={({ isActive }) => ({
            filter: isActive ? 'var(--mobile-nav-image-active-color)' : 'none',
            })}><img src={homeImg} className={styles['navIcons']}></img></NavLink>

            <NavLink to={"/scan"}
            style={({ isActive }) => ({
            filter: isActive ? 'var(--mobile-nav-image-active-color)' : 'none',
            })}><img src={scanImg} className={styles['navIcons']}></img></NavLink>

            <NavLink to={"/scanner"}
            style={({ isActive }) => ({
            filter: isActive ? 'var(--mobile-nav-image-active-color)' : 'none',
            })}><img src={qrImg} className={styles['navIcons']}></img></NavLink>
          </ul>
        </div>
      </MobileView>
    </div>
  )
}