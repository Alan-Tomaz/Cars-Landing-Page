import React from 'react'
import './ProductSlider.css';
import MercedesBenz from "../images/cars/mercedes_benz_amg.png";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function ProductSlider({ bgColor, showProducts = true }) {

    /* document.getElementById("product-slider").style.backgroundColor = `#${bgColor}` */

    return (
        <div className='product-slider' id='product-slider' style={{ backgroundColor: bgColor === 'black' ? "var(--color-primary)" : 'transparent', color: bgColor === 'black' ? 'var(--text-color-variant)' : 'var(--text-color)' }} >
            <h2 className="product-slider__title">MORE POPULAR</h2>
            <div className="product-slider__box">
                <IoIosArrowBack className='arrow' />
                <div className="product-slider__slides">
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
                <IoIosArrowForward className='arrow' />
            </div>
            <div className="product-slider__stages">
                <div id="stage-1" className='product-slider__stage'></div>
                <div id="stage-2" className='product-slider__stage'></div>
                <div id="stage-3" className='product-slider__stage'></div>
            </div>

        </div>
    )
}

export default ProductSlider
