import React from 'react';
import '../../assets/styles/Nav.css';
import { Link } from 'react-router-dom';

export default function Nav(){
    return (
        <div className='nav_bar'>

            <Link to="/">Home</Link>

            <Link to="/scan">Scan</Link>



        </div>
    )
}