import React, { useEffect, useRef, useState } from 'react'
import Background from '../images/car_background.jpg';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import './Product.css';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../components/firebase';
import Loading from '../images/loading.svg';
import { getDownloadURL, ref } from 'firebase/storage';
import { NumericFormat } from 'react-number-format';
import StarRatings from 'react-star-ratings';
import { instanceApiCar, instanceApiMotorcycle } from '../components/axios';

function Product() {

    const timeoutsRef = useRef([]);
    const timeouts = timeoutsRef.current;
    const timeoutDelay = 500;

    const screenWidth = window.screen.width;

    const unknown = '-';

    const [vehicle, setVehicle] = useState();
    const [vehicleInfo, setVehicleInfo] = useState({ make: unknown, model: unknown, class: unknown, cylinders: unknown, transmission: unknown, year: unknown, drive: unknown, fuel_type: unknown, type: unknown, engine: unknown, power: unknown, torque: unknown, valves_per_cylinder: unknown, fuel_system: unknown, fuel_control: unknown, fuel_capacity: unknown, ignition: unknown, cooling: unknown, gearbox: unknown, frame: unknown, starter: unknown, compression: unknown, bore_stroke: unknown, dry_weight: unknown, front_suspension: unknown, front_wheel_travel: unknown, rear_suspension: unknown, rear_wheel_travel: unknown, front_tire: unknown, rear_tire: unknown, front_brakes: unknown, rear_brakes: unknown, seat_height: unknown, wheelbase: unknown, displacement: unknown, clutch: unknown, ground_clearance: unknown, total_length: unknown });
    const [images, setImages] = useState([]);
    const [smallImages, setSmallImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sliderImageCount, setSliderImageCount] = useState(0);

    const { id } = useParams();

    const docRef = doc(db, 'vehicles', id);

    const getVehicle = () => {
        getDoc(docRef).then((docSnap) => {
            setVehicle(docSnap.data());
            getImages(docSnap.data().images_alt);
            getSmallImages(docSnap.data().images_alt_small);
            getVehicleInfo(docSnap.data());
            setIsLoading(false);
            timeouts.push(setTimeout(() => {
                document.querySelectorAll('.background-car').forEach((elem, index) => {
                    if (index == sliderImageCount) {
                        elem.classList.add("background-car-active")
                    }
                })
                document.querySelectorAll('.image-car').forEach((elem => elem.classList.add("image-car-active")));
            }, 1000));
        })
    }

    const getSmallImages = (imgs) => {
        const imgSmallPromises = imgs.map((imag) => {
            return getDownloadURL(ref(storage, `vehicles_images/${imag}`))
        })

        Promise.all(imgSmallPromises)
            .then((urls) => {
                setSmallImages(urls);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
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

    const paragraphy = (text) => {
        var phrases = text.split('. ');

        var paragraphs = [];
        var paragraph = '';

        // Iterar sobre as frases e agrupá-las em parágrafos a cada três
        for (var i = 0; i < phrases.length; i++) {
            // Adicionar a frase atual ao parágrafo
            paragraph += phrases[i] + '. ';

            // Se o número de frases no parágrafo atual for divisível por 3 ou se for a última frase, adicionar o parágrafo aos parágrafos
            if ((i + 1) % 3 === 0 || i === phrases.length - 1) {
                // Remover o último ponto final e espaço do parágrafo final
                if (i === phrases.length - 1) {
                    paragraph = paragraph.slice(0, -2);
                }

                // Adicionar o parágrafo aos parágrafos
                paragraphs.push(paragraph);

                // Reiniciar o parágrafo para o próximo conjunto de frases
                paragraph = '';
            }
        }

        return paragraphs;
    }

    const handleChangeImage = (changeSlide) => {
        if (changeSlide == '>') {
            if (sliderImageCount + 1 <= (images.length - 1)) {
                timeouts.forEach((timeout) => clearTimeout(timeout));
                document.querySelectorAll('.background-car').forEach(elem => elem.classList.remove("background-car-active"))
                setSliderImageCount(sliderImageCount + 1)
                timeouts.push(setTimeout(() => {
                    document.querySelectorAll('.background-car').forEach((elem, index) => {
                        if (index == sliderImageCount + 1) {
                            elem.classList.add("background-car-active")
                        }
                    })
                }, timeoutDelay));
            }
        }
        else if (changeSlide == '<') {
            if (sliderImageCount - 1 >= 0) {
                timeouts.forEach((timeout) => clearTimeout(timeout));
                document.querySelectorAll('.background-car').forEach(elem => elem.classList.remove("background-car-active"))
                setSliderImageCount(sliderImageCount - 1)
                timeouts.push(setTimeout(() => {
                    document.querySelectorAll('.background-car').forEach((elem, index) => {
                        if (index == sliderImageCount - 1) {
                            elem.classList.add("background-car-active")
                        }
                    })
                }, timeoutDelay));
            }
        }
        else {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            document.querySelectorAll('.background-car').forEach(elem => elem.classList.remove("background-car-active"))
            setSliderImageCount(changeSlide)
            timeouts.push(setTimeout(() => {
                document.querySelectorAll('.background-car').forEach((elem, index) => {
                    if (index == changeSlide) {
                        elem.classList.add("background-car-active")
                    }
                })
            }, timeoutDelay));
        }
    }


    const getVehicleInfo = (info) => {
        if (info.type == 'car' || info.type == 'tunning') {
            instanceApiCar.get(`&model=${info.model}`).then((vehInfo) => {
                const newVehInfo = vehInfo.data.filter(veh => veh.make == info.make);
                if (newVehInfo.length > 0) {
                    const sortedArray = newVehInfo.sort((a, b) => b.year - a.year);
                    setVehicleInfo(sortedArray[0])
                }
            })
        }
        else if (info.type == 'motorcycle') {
            instanceApiMotorcycle.get(`&make=${info.make}&model=${info.model}`).then((vehInfo) => {
                if (vehInfo.data.length > 0) {
                    const sortedArray = vehInfo.data.sort((a, b) => b.year - a.year);
                    setVehicleInfo(sortedArray[0])
                }
            })
        }
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
                                    <div className={0 == sliderImageCount ? 'change-car-prev disabled' : 'change-car-prev'} onClick={() => handleChangeImage('<')}>
                                        <MdNavigateBefore className='change-car-prev__icon' />
                                    </div>
                                    {images.map((image, index) => (
                                        <img src={images[index]} className='background-car' />
                                    ))}
                                    <div className={images.length == sliderImageCount + 1 ? 'change-car-next disabled' : 'change-car-next'} onClick={() => handleChangeImage('>')}>
                                        <MdNavigateNext className='change-car-next__icon' />
                                    </div>
                                </div>
                                <div className="other-images">
                                    <MdNavigateBefore className={0 == sliderImageCount ? 'change-car disabled' : 'change-car'} id='change-car-prev' onClick={() => handleChangeImage('<')} />
                                    {smallImages.map((image, index) => (
                                        <>
                                            <div className={sliderImageCount == index ? "image image-active" : "image"} onClick={() => handleChangeImage(index)}>
                                                <img src={image} className='image-car' />
                                            </div>
                                            {index > 2 && screenWidth > 1024 ? (
                                                <div className={sliderImageCount == index ? "image image-active" : "image"} onClick={() => handleChangeImage(index)}>
                                                    <img src={image} className='image-car' />
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                            }
                                        </>
                                    ))}
                                    <MdNavigateNext className={images.length == sliderImageCount + 1 ? 'change-car disabled' : 'change-car'} id='change-car-next' onClick={() => handleChangeImage('>')} />
                                </div>
                            </div>
                            <div className="vehicle__info">
                                <h3 className='vehicle__name'>{(`${vehicle.make} ${vehicle.model}`).toUpperCase()} {vehicle.type == 'tunning' ? '(CUSTOMIZED)' : ''}</h3>
                                <h6 className='vehicle__brand'>{(`${vehicle.make}`).toUpperCase()}</h6>
                                <span className='vehicle__price'>US$  <NumericFormat value={vehicle.price} thousandSeparator="," displayType='text' /></span>
                                <div className="star-ratings-box">
                                    <StarRatings
                                        rating={Number(vehicle.rating)}
                                        starDimension="15px"
                                        starSpacing="2px"
                                        starRatedColor='#fbff00'
                                    />
                                    <span>({vehicle.rating})</span>
                                </div>
                                <p className='vehicle__desc'>{vehicle.short_desc}</p>
                                <hr className='product__row' />
                                <p className='product__tag'>Tag: <span>{`${vehicle.type.slice(0, 1).toUpperCase()}${vehicle.type.slice(1)}`}</span></p>
                            </div>
                        </div>

                        <div className='product__description'>
                            <h3 >DESCRIPTION</h3>
                            <hr />
                            {(paragraphy(vehicle.long_desc)).map(text => (
                                <p>{text}</p>
                            ))}
                        </div>
                    </section>
                    <section className='product__information'>
                        <h4>Details</h4>
                        <div className={vehicle.type == 'motorcycle' ? "datasheet datasheet-motorcycle" : "datasheet"}>
                            <div className="product__technique">
                                {vehicle.type == 'car' || vehicle.type == 'tunning' ?
                                    <>
                                        <h6>Make: <span>{vehicleInfo.hasOwnProperty('make') == true ? vehicleInfo.make.toUpperCase() : unknown}</span></h6>
                                        <h6>Model: <span>{vehicleInfo.hasOwnProperty('model') == true ? vehicleInfo.model.toUpperCase() : unknown}</span></h6>
                                        <h6>Fuel Type: <span>{vehicleInfo.hasOwnProperty('fuel_type') == true ? vehicleInfo.fuel_type.toUpperCase() : unknown}</span></h6>
                                        <h6>Cylinders: <span>{vehicleInfo.hasOwnProperty('cylinders') == true ? vehicleInfo.cylinders : unknown}</span></h6>
                                    </>
                                    :
                                    <>
                                        <h6>Make: <span>{vehicleInfo.hasOwnProperty('make') == true ? vehicleInfo.make.toUpperCase() : unknown}</span></h6>
                                        <h6>Model: <span>{vehicleInfo.hasOwnProperty('model') == true ? vehicleInfo.model.toUpperCase() : unknown}</span></h6>
                                        <h6>Year: <span>{vehicleInfo.hasOwnProperty('year') == true ? vehicleInfo.year : unknown}</span></h6>
                                        <h6>Type: <span>{vehicleInfo.hasOwnProperty('type') == true ? vehicleInfo.type.toUpperCase() : unknown}</span></h6>
                                        <h6>Power: <span>{vehicleInfo.hasOwnProperty('power') == true ? vehicleInfo.power.toUpperCase() : unknown}</span></h6>
                                        <h6>Torque: <span>{vehicleInfo.hasOwnProperty('torque') == true ? vehicleInfo.torque.toUpperCase() : unknown}</span></h6>
                                        <h6>Engine: <span>{vehicleInfo.hasOwnProperty('engine') == true ? vehicleInfo.engine.toUpperCase() : unknown}</span></h6>
                                        <h6>Displacement: <span>{vehicleInfo.hasOwnProperty('displacement') == true ? vehicleInfo.displacement.toUpperCase() : unknown}</span></h6>
                                        <h6>Ignition: <span>{vehicleInfo.hasOwnProperty('ignition') == true ? vehicleInfo.ignition.toUpperCase() : unknown}</span></h6>
                                        <h6>Transmission: <span>{vehicleInfo.hasOwnProperty('transmission') == true ? vehicleInfo.transmission.toUpperCase() : unknown}</span></h6>
                                        <h6>Gearbox: <span>{vehicleInfo.hasOwnProperty('gearbox') == true ? vehicleInfo.gearbox.toUpperCase() : unknown}</span></h6>
                                        <h6>Cooling: <span>{vehicleInfo.hasOwnProperty('cooling') == true ? vehicleInfo.cooling.toUpperCase() : unknown}</span></h6>
                                        <h6>Starter: <span>{vehicleInfo.hasOwnProperty('starter') == true ? vehicleInfo.starter.toUpperCase() : unknown}</span></h6>
                                        <h6>Wheelbase: <span>{vehicleInfo.hasOwnProperty('wheelbase') == true ? vehicleInfo.wheelbase.toUpperCase() : unknown}</span></h6>
                                        <h6>Seat Height: <span>{vehicleInfo.hasOwnProperty('seat_height') == true ? vehicleInfo.seat_height.toUpperCase() : unknown}</span></h6>
                                        <h6>Dry Weight: <span>{vehicleInfo.hasOwnProperty('dry_weight') == true ? vehicleInfo.dry_weight.toUpperCase() : unknown}</span></h6>
                                        <h6>Clutch: <span>{vehicleInfo.hasOwnProperty('clutch') == true ? vehicleInfo.clutch.toUpperCase() : unknown}</span></h6>
                                    </>
                                }
                            </div>
                            <hr className={vehicle.type == 'car' || vehicle.type == 'tunning' ? 'product__vertical-row product__vertical-row__car' : 'product__vertical-row product__vertical-row__motorcycle'} />
                            <hr className='product-horiontal-row' />
                            <div className="product__technique">
                                {vehicle.type == 'car' || vehicle.type == 'tunning' ?
                                    <>
                                        <h6>Year: <span>{vehicleInfo.hasOwnProperty('year') == true ? vehicleInfo.year : unknown}</span></h6>
                                        <h6>Class: <span>{vehicleInfo.hasOwnProperty('class') == true ? vehicleInfo.class.toUpperCase() : unknown}</span></h6>
                                        <h6>Drive: <span>{vehicleInfo.hasOwnProperty('drive') == true ? vehicleInfo.drive == 'fwd' ? 'FRONT WHEEL DRIVE' : vehicleInfo.drive == 'rwd' ? 'REAR WHEEL DRIVE' : vehicleInfo.drive == 'awd' ? 'ALL WHEEL DRIVE' : vehicleInfo.drive == '4wd' ? 'FOUR WHEEL DRIVE' : unknown : unknown}</span></h6>
                                        <h6>Transmission: <span>{vehicleInfo.hasOwnProperty('transmission') == true ? vehicleInfo.transmission == 'm' ? 'MANUAL' : vehicleInfo.transmission == 'a' ? 'AUTOMATIC' : unknown : unknown}</span></h6>

                                    </>
                                    :
                                    <>
                                        <h6>Compression: <span>{vehicleInfo.hasOwnProperty('compression') == true ? vehicleInfo.compression.toUpperCase() : unknown}</span></h6>
                                        <h6>Bore Stroke: <span>{vehicleInfo.hasOwnProperty('bore_stroke') == true ? vehicleInfo.bore_stroke.toUpperCase() : unknown}</span></h6>
                                        <h6>Valves Per Cylinder: <span>{vehicleInfo.hasOwnProperty('valves_per_cylinder') == true ? vehicleInfo.valves_per_cylinder.toUpperCase() : unknown}</span></h6>
                                        <h6>Fuel System: <span>{vehicleInfo.hasOwnProperty('fuel_system') == true ? vehicleInfo.fuel_system.toUpperCase() : unknown}</span></h6>
                                        <h6>Fuel Control: <span>{vehicleInfo.hasOwnProperty('fuel_control') == true ? vehicleInfo.fuel_control.toUpperCase() : unknown}</span></h6>
                                        <h6>Fuel Capacity: <span>{vehicleInfo.hasOwnProperty('fuel_capacity') == true ? vehicleInfo.fuel_capacity.toUpperCase() : unknown}</span></h6>
                                        <h6>Frame: <span>{vehicleInfo.hasOwnProperty('frame') == true ? vehicleInfo.frame.toUpperCase() : unknown}</span></h6>
                                        <h6>Front Suspension: <span>{vehicleInfo.hasOwnProperty('front_suspension') == true ? vehicleInfo.front_suspension.toUpperCase() : unknown}</span></h6>
                                        <h6>Rear Suspension: <span>{vehicleInfo.hasOwnProperty('rear_suspension') == true ? vehicleInfo.rear_suspension.toUpperCase() : unknown}</span></h6>
                                        <h6>Front Tire: <span>{vehicleInfo.hasOwnProperty('front_tire') == true ? vehicleInfo.front_tire.toUpperCase() : unknown}</span></h6>
                                        <h6>Rear Tire: <span>{vehicleInfo.hasOwnProperty('rear_tire') == true ? vehicleInfo.rear_tire.toUpperCase() : unknown}</span></h6>
                                        <h6>Front Brakes: <span>{vehicleInfo.hasOwnProperty('front_brakes') == true ? vehicleInfo.front_brakes.toUpperCase() : unknown}</span></h6>
                                        <h6>Rear Brakes: <span>{vehicleInfo.hasOwnProperty('rear_brakes') == true ? vehicleInfo.rear_brakes.toUpperCase() : unknown}</span></h6>
                                        <h6>Front Wheel Travel: <span>{vehicleInfo.hasOwnProperty('front_wheel_travel') == true ? vehicleInfo.front_wheel_travel.toUpperCase() : unknown}</span></h6>
                                        <h6>Rear Wheel Travel: <span>{vehicleInfo.hasOwnProperty('rear_wheel_travel') == true ? vehicleInfo.rear_wheel_travel.toUpperCase() : unknown}</span></h6>
                                        <h6>Ground Clearence: <span>{vehicleInfo.hasOwnProperty('ground_clearance') == true ? vehicleInfo.ground_clearance.toUpperCase() : unknown}</span></h6>
                                        <h6>Total Length: <span>{vehicleInfo.hasOwnProperty('total_length') == true ? vehicleInfo.total_length.toUpperCase() : unknown}</span></h6>
                                    </>
                                }
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
