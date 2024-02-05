import React, { useEffect, useState } from 'react'
import './ProductSlider.css';
import { Link } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from './firebase';
import Ellipse from '../images/ellipse.svg';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ImageSlide from './ImageSlide';


function ProductSlider({ bgColor, showProducts = true }) {

    const [vehicles, setVehicles] = useState([]);

    const getVehicles = () => {
        const q = query(collection(db, 'vehicles'), where('isHighlighted', '==', true))
        getDocs(q).then((querySnapshot) => {
            setVehicles(querySnapshot.docs);
        })
    };

    useEffect(() => {
        /* get vehicles */
        getVehicles();
    }, [])

    return (
        <div className="product-slider" style={{ backgroundColor: bgColor === 'black' ? "var(--color-primary)" : 'transparent', color: bgColor === 'black' ? 'var(--text-color-variant)' : 'var(--text-color)' }}>
            <h2 className="product-slider__title">MORE POPULAR</h2>
            <Swiper pagination={{ clickable: true }} modules={[Pagination, Navigation, Autoplay]} navigation={true} className="mySwiper" autoplay={{ delay: 5000 }}>
                {vehicles.map(vehicle => (
                    <SwiperSlide className='product-slider__slides' key={vehicle.id} id={vehicle.id}>
                        <p className='prodcut-slider__subtitle'>{`${vehicle.data().make} ${vehicle.data().model}`.toUpperCase()}</p>
                        <div className="image-slide-box">
                            <img src={Ellipse} className='ellipse' />
                            <ImageSlide image={vehicle.data().image} />
                        </div>
                        {vehicle.data().short_desc.length > 180 ?
                            <p className='product-slider__desc'>
                                {vehicle.data().short_desc.slice(0, 180)}...
                            </p>
                            :
                            <p className='product-slider__desc'>
                                {vehicle.data().short_desc}
                            </p>
                        }
                        <div className="product-slider__buttons">
                            <Link to={`/product/${vehicle.id}`} className='button--blue product-slider__button'>Show Info</Link>
                            <Link to="/products" className='button--blue unfill--blue product-slider__button unfill' style={{ display: showProducts ? "flex" : "none" }}>See Products</Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductSlider
