import React from 'react'
import './HeroSection.css';
import Bmw from '../images/cars/bmw_m2_1.png';
import { Link } from 'react-router-dom';

function HeroSection() {

    let svg;

    const screenWidth = window.screen.width;

    if (screenWidth > 2000) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="2878" height="1391" viewBox="0 0 2878 1391" fill="none"><path d="M156.249 0H2878V1117.51C2878 1117.51 2575.35 1316.01 2242.92 1207.51C2242.92 1207.51 1786.46 1012.55 1333.55 1235.01C880.631 1457.48 507.808 1462.01 156.249 1117.51C-195.311 773.007 156.249 0 156.249 0Z" fill="#1E1E1E" /></svg>
    }

    else if (screenWidth < 2000 && screenWidth > 1280) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="2031" height="1391" viewBox="0 0 2031 1391" fill="none"><path d="M111 0H2031V1117.5C2031 1117.5 1817.5 1316 1583 1207.5C1583 1207.5 1261 1012.54 941.5 1235C622 1457.46 359 1462 111 1117.5C-137 773 111 0 111 0Z" fill="#1E1E1E" /></svg>
    }

    else if (screenWidth <= 1280 && screenWidth > 1024) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="1462" height="1108" viewBox="0 0 1462 1108" fill="none">
            <path d="M79.3731 0H1462V890.152C1462 890.152 1308.25 1048.27 1139.39 961.842C1139.39 961.842 907.509 806.544 677.431 983.747C447.353 1160.95 257.962 1164.57 79.373 890.152C-99.2163 615.738 79.3731 0 79.3731 0Z" fill="#1E1E1E" />
        </svg>
    }

    else if (screenWidth > 600 && screenWidth <= 1024) {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="1154" height="924" viewBox="0 0 1154 924" fill="none">
            <path d="M62.6515 0H1154V742.329C1154 742.329 1032.64 874.188 899.352 802.114C899.352 802.114 716.323 672.605 534.716 820.381C353.109 968.158 203.617 971.172 62.6515 742.329C-78.3144 513.486 62.6515 0 62.6515 0Z" fill="#1E1E1E" />
        </svg>
    }

    else {
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="606" height="954" viewBox="0 0 606 954" fill="none">
            <path d="M32.9002 0H606V766.43C606 766.43 542.272 902.57 472.277 828.156C472.277 828.156 376.163 694.443 280.796 847.017C185.428 999.591 106.926 1002.7 32.9002 766.43C-41.1252 530.157 32.9002 0 32.9002 0Z" fill="#1E1E1E" />
        </svg>
    }

    return (
        <div className='hero-section'>
            {svg
            }
            <div className='hero-section__container container container-alt'>
                <div className="hero-section__text">
                    <h1 className='hero-section__title'>Buying and <br />Selling <span className='hero-section__title-black'>Vehicles.</span></h1>
                    <h3 className='hero-section__subtitle'>With a wide range of vehicles available, we can help you find the perfect vehicle for your needs.</h3>
                    <div className="hero-section__buttons">
                        <Link to="/products" className="button--blue hero-section__button">Our Products</Link>
                        <Link to="/contact" className="button--blue unfill--blue hero-section__button ">Contact Us</Link>
                    </div>
                </div>
                <div className="hero-section__image">
                    <div className="hero-section__image-box">
                        <img src={Bmw} alt="bmw m2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
