import React, { useEffect, useState } from 'react'
import Background from '../images/car_background.jpg';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Bmw from '../images/cars/bmw_m2.png';
import './Product.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../components/firebase';
import Loading from '../images/loading.svg';
import { getDownloadURL, ref } from 'firebase/storage';
import { NumericFormat } from 'react-number-format';
import StarRatings from 'react-star-ratings';

function Product() {

    const screenWidth = window.screen.width;

    const [vehicle, setVehicle] = useState({ make: '', model: '', image: '', images_alt: [''], images_alt_small: [''], long_desc: '', price: '', type: '', short_desc: '', rating: '' });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const docRef = doc(db, 'vehicles', id);

    const getVehicle = () => {
        getDoc(docRef).then((docSnap) => {
            setVehicle(docSnap.data());
            getImages(docSnap.data().images_alt);
            setIsLoading(false);
        })
    }

    const getImages = (imgs) => {
        const imgPromises = imgs.map((imag) => {
            return getDownloadURL(ref(storage, `vehicles_images/${imag}`))
        })

        Promise.all(imgPromises)
            .then((urls) => {
                setImages(urls);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }


    useEffect(() => {
        getVehicle()
    }, [])

    return (
        <div className='product__page' >
            {isLoading == false ?
                <>
                    <section className='product__container container'>
                        <div className='product__box'>
                            <div className="img__box">
                                <div className="img-background">
                                    <img src={Background} alt="car background" className='background' />
                                    <img src={images[0]} className='background-car' />
                                </div>
                                <div className="other-images">
                                    <MdNavigateBefore className='change-car' />
                                    {images.map((image, index) => (
                                        <>
                                            <div className="image">
                                                <img src={image} alt="Bmw" />
                                            </div>
                                            {index > 2 && screenWidth > 1024 ? (
                                                <div className="image">
                                                    <img src={image} alt="Bmw" />
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                            }
                                        </>
                                    ))}
                                    <MdNavigateNext className='change-car' />
                                </div>
                            </div>
                            <div className="vehicle__info">
                                <h3 className='vehicle__name'>{(`${vehicle.make} ${vehicle.model}`).toUpperCase()}</h3>
                                <h6 className='vehicle__brand'>{(`${vehicle.make}`).toUpperCase()}</h6>
                                <span className='vehicle__price'>US$  <NumericFormat value={vehicle.price} thousandSeparator="," displayType='text' /></span>
                                <StarRatings
                                    rating={Number(vehicle.rating)}
                                    starDimension="15px"
                                    starSpacing="2px"
                                    starRatedColor='#fbff00'
                                />
                                <p className='vehicle__desc'>{vehicle.short_desc}</p>
                                <hr className='product__row' />
                                <p className='product__tag'>Tag: <span>{`${vehicle.type.slice(0, 1).toUpperCase()}${vehicle.type.slice(1)}`}</span></p>
                            </div>
                        </div>

                        <div className='product__description'>
                            <h3 >DESCRIPTION</h3>
                            <hr />
                            <p>{vehicle.long_desc}</p>
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
                </> :
                <>
                    <img src={Loading} className='product__loading' />
                </>
            }
        </div>

    )
}

export default Product
