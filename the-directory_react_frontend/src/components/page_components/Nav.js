import React from 'react';
import '../../assets/styles/Nav.css';
import { Link } from 'react-router-dom';

export default function Nav(){
    return (
        <div className='nav_bar'>

            <Link className = 'link_item' to="/">Home</Link>

            <Link  className = 'link_item' to="/scan">Scan</Link>

            <Link  className = 'link_item' to="/scanner">Scanner</Link>



        </div>
    )
}