import React from 'react'
import './ProductSlider.css';
import MercedesBenz from "../images/cars/mercedes_benz_amg.png";
import Bmw from "../images/cars/bmw_m2_2.png";
import Mazda from '../images/cars/mazda_atenza.png';
import { Link } from 'react-router-dom';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function ProductSlider({ bgColor, showProducts = true }) {

    return (
        <div className="product-slider" style={{ backgroundColor: bgColor === 'black' ? "var(--color-primary)" : 'transparent', color: bgColor === 'black' ? 'var(--text-color-variant)' : 'var(--text-color)' }}>
            <h2 className="product-slider__title">MORE POPULAR</h2>
            <Swiper pagination={true} modules={[Pagination, Navigation]} navigation={true} className="mySwiper">
                <SwiperSlide className='product-slider__slides'>
                    <p className='prodcut-slider__subtitle'>Mercedes-Benz AMG GT</p>
                    <img src={MercedesBenz} alt='mercedes-benz' />
                    <p className='product-slider__desc'>
                        The AMG GT is the perfect car for those looking for the best o both worlds: perfomance and comfort.
                    </p>
                    <div className="product-slider__buttons">
                        <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                        <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='product-slider__slides'>
                    <p className='prodcut-slider__subtitle'>Mazda Atenza</p>
                    <img src={Mazda} alt='mercedes-benz' />
                    <p className='product-slider__desc'>
                        Mazda6 is equipped with gasoline and diesel engines, with outputs between 165 and 254 horsepower.
                    </p>
                    <div className="product-slider__buttons">
                        <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                        <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='product-slider__slides'>
                    <p className='prodcut-slider__subtitle'>BMW M2</p>
                    <img src={Bmw} alt='mercedes-benz' />
                    <p className='product-slider__desc'>
                        The BMW M2 has several modifications to improve its performance, such as a more powerful engine, a sportier suspension and an improved braking system.
                    </p>
                    <div className="product-slider__buttons">
                        <Link to="/product:id" className='button--blue product-slider__button'>Show Info</Link>
                        <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ProductSlider
