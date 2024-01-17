import React from 'react'
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import HondaCivic from "../images/cars/honda_civic_red.png";
import Mercedes from "../images/cars/mercedes-benz.png";
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <HeroSection />
            <main>
                <section className='section section-1 container'>
                    <div className="section__image">
                        <img src={HondaCivic} alt="honda_civic" />
                    </div>
                    <div className="section__text">
                        <h2>About Us</h2>
                        <p>We are a vehicle buying and selling company that offers our customers a unique and personalized experience. Our goal is to help our customers find the perfect vehicle for their needs, whether for personal or commercial use. We have a wide range of cars available, including new and used, and we offer a range of services to our customers, including financing, insurance and maintenance. We are always on hand to help our customers find the perfect car and make their shopping experience as pleasant as possible.</p>
                        <Link to="/about#about" className='section__button'>See More</Link>
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
                        <Link to="about#services" className='section__button section__button--unfill'>Services</Link>
                    </div>
                    <div className="section__image">
                        <img src={Mercedes} alt="mercedes_benz" />
                    </div>
                </section>
                <ProductSlider />
            </main>
        </div>
    )
}

export default Home
