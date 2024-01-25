import React from 'react'
import Background from '../images/car_background.jpg';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Bmw from '../images/cars/bmw_m2.png';
import './Product.css';

function Product() {

    const screenWidth = window.screen.width;

    return (
        <div className='product__page'>
            <section className='product__container container'>


                <div className='product__box'>
                    <div className="img__box">
                        <div className="img-background">
                            <img src={Background} alt="car background" className='background' />
                            <img src={Bmw} alt="BMW M2" className='background-car' />
                        </div>
                        <div className="other-images">
                            <MdNavigateBefore className='change-car' />
                            {screenWidth > 1024 && (
                                <div className="image">
                                    <img src={Bmw} alt="Bmw" />
                                </div>
                            )}
                            <div className="image">
                                <img src={Bmw} alt="Bmw" />
                            </div>

                            <div className="image">
                                <img src={Bmw} alt="Bmw" />
                            </div>
                            <div className="image">
                                <img src={Bmw} alt="Bmw" />
                            </div>

                            <MdNavigateNext className='change-car' />
                        </div>
                    </div>
                    <div className="vehicle__info">
                        <h3 className='vehicle__name'>BMW M2</h3>
                        <h6 className='vehicle__brand'>BMW</h6>
                        <span className='vehicle__price'>US$ 250.000,000</span>
                        <p className='vehicle__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem veritatis voluptas nemo dolor quibusdam.</p>
                        <hr className='product__row' />
                        <p className='product__tag'>Tag: <span>Car</span></p>
                    </div>
                </div>

                <div className='product__description'>
                    <h3 >DESCRIPTION</h3>
                    <hr />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt odit odio minus, suscipit quasi ipsam qui, atque necessitatibus nemo molestias consequatur, corporis incidunt. Minus modi, suscipit quisquam laudantium molestiae accusamus.</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet magnam aperiam, error quam excepturi, corrupti dolore totam quos quo debitis veritatis reprehenderit? Ullam ipsam, reprehenderit accusantium porro non natus illum.</p>
                </div>
            </section>
            <section className='product__information'>
                <h4>Details</h4>
                <div className="datasheet">
                    <div className="product__technique">
                        <h6>Make: <span>BMW</span></h6>
                        <h6>Model: <span>M2</span></h6>
                        <h6>Fuel Type: <span>Gas</span></h6>
                        <h6>Cylinders: <span>6</span></h6>
                    </div>
                    <hr className='product__vertical-row' />
                    <div className="product__technique">
                        <h6>Transmition: <span>Manual</span></h6>
                        <h6>Year: <span>2015</span></h6>
                        <h6>Drive: <span>Front Wheel Drive</span></h6>
                        <h6>Class: <span>Mid-Size Car</span></h6>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product
