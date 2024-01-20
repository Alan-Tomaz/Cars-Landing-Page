import React from 'react'
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from '../images/logo.png';

function Footer() {
    return (
        <div className='footer'>
            <div className="footer__upside">
                <div className="footer__info">
                    <div className="footer__logo">
                        <img src={Logo} alt="Logo" />
                        <h2 className="footer__title">NightDrive</h2>
                    </div>
                    <p className='footer__slogan'>The best way to buy and sell cars</p>
                </div>
                <div className="footer__links-box">
                    <div className="footer__links">
                        <span>WEEBLY THEMES</span>
                        <span>PRE-SALE FAOS</span>
                        <span>SUBMIT A TICKET</span>
                    </div>
                    <div className="footer__links">
                        <span>SERVICES</span>
                        <span>THEME TWEAK</span>
                    </div>
                    <div className="footer__links">
                        <span>SHOWCASE</span>
                        <span>WIDGET TICKET</span>
                        <span>SUPPORT</span>
                    </div>
                    <div className="footer__links">
                        <span>HOME</span>
                        <span>ABOUT</span>
                        <span>CONTACT</span>
                        <span>PRODUCTS</span>
                    </div>
                </div>
            </div>
            <hr className="footer-row" />
            <div className="footer__downside">
                <div className="footer__social-medias">
                    <div className="footer__twitter">
                        <FaTwitter />
                    </div>
                    <div className="footer__instagram">
                        <FaInstagram />
                    </div>
                    <div className="footer__facebook">
                        <FaFacebook />
                    </div>
                    <div className="footer__email">
                        <MdEmail />
                    </div>
                </div>
                <p className='footer__copy'>&copy; Copyright. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
