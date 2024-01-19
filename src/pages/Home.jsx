import React from 'react'
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import HondaCivic from "../images/cars/honda_civic_red.png";
import Mercedes from "../images/cars/mercedes-benz.png";
import YamahaBike from '../images/cars/yamaha_bike.png';
import TunningCar from '../images/cars/tunning_car.png';
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <HeroSection />
            <main>
                <section className='section container' id='section-1'>
                    <div className="section__image">
                        <img src={HondaCivic} alt="honda_civic" />
                    </div>
                    <div className="section__text">
                        <h2>About Us</h2>
                        <p>We are a vehicle buying and selling company that offers our customers a unique and personalized experience. Our goal is to help our customers find the perfect vehicle for their needs, whether for personal or commercial use. We have a wide range of cars available, including new and used, and we offer a range of services to our customers, including financing, insurance and maintenance. We are always on hand to help our customers find the perfect car and make their shopping experience as pleasant as possible.</p>
                        <Link to="/about#about" className='button--black section__button'>See More</Link>
                    </div>
                </section>
                <div className="separator">
                    <hr className='separate-row' />
                </div>
                <section className='section section-1 container'>
                    <div className="section__text">
                        <h2>Services</h2>
                        <p>We can help you find a new or used vehicle, of different types, that can meet your needs. With our services we can help you finance, insure and maintain your car.
                            We also offer vehicle customization services, such as painting, accessories and modifications.
                            We are always on hand to help you find the perfect vehicle and make your shopping experience as pleasant as possible.</p>
                        <Link to="about#services" className=' button--black section__button unfill--black'>Services</Link>
                    </div>
                    <div className="section__image">
                        <img src={Mercedes} alt="mercedes_benz" />
                    </div>
                </section>
                <ProductSlider bgColor='black' />
                <section className='section container' id='section-2'>
                    <div className="section__image">
                        <img src={TunningCar} alt="honda_civic" />
                    </div>
                    <div className="section__text">
                        <h2>Tunning</h2>
                        <p>Our vehicle customization service offers a variety of options for you to personalize your car or motorcycle. We can paint your vehicle in any color you choose, add accessories such as wheels, spoilers and side skirts, or make mechanical modifications such as increasing engine power or installing a high-quality sound system. We can help you turn your vehicle into a dream come true.</p>
                        <Link to="/products?filter=tunning" className='button--black section__button'>See Cars</Link>
                    </div>
                </section>
                <div className="separator">
                    <hr className='separate-row' />
                </div>
                <section className='section section-1 container'>
                    <div className="section__text">
                        <h2>Motorcycles</h2>
                        <p>We offer a variety of bikes to suit your needs, including sport bikes, touring bikes, adventure bikes, cross bikes and small displacement bikes. Our motorcycles have varying capacities, from 125 cc to over 1,000 cc. We can help you find the perfect bike for you.</p>
                        <Link to="/products?motorcycles" className=' button--black section__button unfill--black'>See Motorcycles</Link>
                    </div>
                    <div className="section__image">
                        <img src={YamahaBike} alt="mercedes_benz" />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
