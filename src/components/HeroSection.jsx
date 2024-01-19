import React from 'react'
import './HeroSection.css';
import Bmw from '../images/cars/bmw_m2_1.png';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className='hero-section'>
            <svg xmlns="http://www.w3.org/2000/svg" width="2031" height="1391" viewBox="0 0 2031 1391" fill="none">
                <path d="M111 0H2031V1117.5C2031 1117.5 1817.5 1316 1583 1207.5C1583 1207.5 1261 1012.54 941.5 1235C622 1457.46 359 1462 111 1117.5C-137 773 111 0 111 0Z" fill="#1E1E1E" />
            </svg>
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
