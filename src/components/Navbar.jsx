import React, { useEffect, useRef, useState } from 'react'
import { TfiMenuAlt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";
import '../index.css';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

function Navbar() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const navbarRef = useRef(null);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const closeNavbar = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsNavbarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeNavbar);
        return () => {
            document.removeEventListener('mousedown', closeNavbar);
        };
    }, []);

    return (
        <nav className='navbar'>
            <div className="navbar__container container container-alt">
                <Link to="/">
                    <div className='logo'>
                        <img src={logo} alt="logo-img" className='logo__img' />
                        <h3 className='logo__title'>NightDrive</h3>
                    </div>
                </Link>

                <div className="navbar__items" ref={navbarRef}>
                    {isNavbarOpen ? (
                        <IoClose className={isNavbarOpen == true ? 'sd-menu menu-active' : 'sd-menu'} id='close' onClick={toggleNavbar} />
                    ) : (
                        <TfiMenuAlt className={isNavbarOpen == false ? 'sd-menu menu-active' : 'sd-menu'} id='open' onClick={toggleNavbar} />
                    )
                    }
                    <ul className={isNavbarOpen == true ? 'navbar__items-ul navbar__items-show' : 'navbar__items-ul'} >
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
                        <li>
                            <Link to="/contact" className='navbar__item'>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className='navbar__item'>
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
