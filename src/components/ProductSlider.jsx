import React from 'react'
import './ProductSlider.css';
import MercedesBenz from "../images/cars/mercedes_benz_amg.png";
import Bmw from "../images/cars/bmw_m2_2.png";
import Mazda from '../images/cars/mazda_atenza.png';
import { Link } from 'react-router-dom';

/* Swiper */
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],

    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next swiper-button',
        prevEl: '.swiper-button-prev swiper-button',
    },
}
);

function ProductSlider({ bgColor, showProducts = true }) {

    const screenWidth = window.screen.width;

    return (
        <div className="product-slider" style={{ backgroundColor: bgColor === 'black' ? "var(--color-primary)" : 'transparent', color: bgColor === 'black' ? 'var(--text-color-variant)' : 'var(--text-color)' }}>
            <h2 className="product-slider__title">MORE POPULAR</h2>
            <div className='swiper' >
                <div className="swiper-wrapper product-slider__box">
                    <div className="product-slider__slides swiper-slide">
                        <p className='prodcut-slider__subtitle'>Mercedes-Benz AMG GT</p>
                        <img src={MercedesBenz} alt='mercedes-benz' />
                        <p className='product-slider__desc'>
                            The AMG GT is the perfect car for those looking for the best o both worlds: perfomance and comfort.
                        </p>
                        <div className="product-slider__buttons">
                            <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                            <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                        </div>
                    </div>
                    <div className="product-slider__slides swiper-slide">
                        <p className='prodcut-slider__subtitle'>Mazda Atenza</p>
                        <img src={Mazda} alt='mercedes-benz' />
                        <p className='product-slider__desc'>
                            Mazda6 is equipped with gasoline and diesel engines, with outputs between 165 and 254 horsepower.
                        </p>
                        <div className="product-slider__buttons">
                            <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                            <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                        </div>
                    </div>
                    <div className="product-slider__slides swiper-slide">
                        <p className='prodcut-slider__subtitle'>BMW M2</p>
                        <img src={Bmw} alt='mercedes-benz' />
                        <p className='product-slider__desc'>
                            The BMW M2 has several modifications to improve its performance, such as a more powerful engine, a sportier suspension and an improved braking system.
                        </p>
                        <div className="product-slider__buttons">
                            <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                            <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                        </div>
                    </div>
                </div>

                <div class="swiper-pagination"></div>

                <div class="swiper-button-prev swiper-button"></div>
                <div class="swiper-button-next swiper-button"></div>
            </div>
        </div>
    )
}

export default ProductSlider
