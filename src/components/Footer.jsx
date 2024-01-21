import React from 'react'
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer '>
            <div className="footer-container container container-alt">
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
                            <Link to="">WEEBLY THEMES</Link >
                            <Link to="">PRE-SALE FAOS</Link>
                            <Link to="">SUBMIT A TICKET</Link>
                        </div>
                        <div className="footer__links">
                            <Link to="">SERVICES</Link>
                            <Link to="">THEME TWEAK</Link>
                        </div>
                        <div className="footer__links">
                            <Link to="">SHOWCASE</Link>
                            <Link to="">WIDGET TICKET</Link>
                            <Link to="">SUPPORT</Link>
                        </div>
                        <div className="footer__links">
                            <Link to="">HOME</Link>
                            <Link to="">ABOUT</Link>
                            <Link to="">CONTACT</Link>
                            <Link to="">PRODUCTS</Link>
                        </div>
                    </div>
                </div>
                <hr className="footer__row" />
                <div className="footer__downside">
                    <div className="footer__social">
                        <a href='https://twitter.com/home?lang=pt' className="footer__twitter footer__social-medias">
                            <FaTwitter className='footer__social-media' />
                        </a>
                        <a href='https://www.instagram.com' className="footer__instagram footer__social-medias">
                            <FaInstagram className='footer__social-media' />
                        </a>
                        <a href="https://www.facebook.com" className="footer__facebook footer__social-medias">
                            <FaFacebook className='footer__social-media' />
                        </a>
                        <a href='https://mail.google.com' className="footer__email footer__social-medias">
                            <MdEmail className='footer__social-media' />
                        </a>
                    </div>
                    <p className='footer__copy'>&copy; Copyright. All rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
