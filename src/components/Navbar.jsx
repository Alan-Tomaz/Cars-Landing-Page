import React from 'react'
import { TfiMenuAlt } from "react-icons/tfi";
import "./Navbar.css";
import '../index.css';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar'>
            <div className="navbar__container container container-alt">
                <Link to="/">
                    <div className='logo'>
                        <img src={logo} alt="logo-img" className='logo__img' />
                        <h3 className='logo__title'>NightDrive</h3>
                    </div>
                </Link>

                <ul className='navbar__items'>
                    <li>
                        <Link to="/" className='navbar__item'>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/about" className='navbar__item'>
                            About
                        </Link>
                    </li>
                    <Link to="/contact" className='navbar__item'>
                        Contact
                    </Link>
                    <Link to="/products" className='navbar__item'>
                        Products
                    </Link>
                </ul>
                <TfiMenuAlt display="none" />
            </div>
        </nav >
    )
}

export default Navbar
