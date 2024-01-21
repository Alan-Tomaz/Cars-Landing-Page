import React from 'react'
import Title from '../components/Title';
import ManAtNight from '../images/ManAtNight.jpeg';
import Velocimeter from '../images/velocimeter.jpg';
import Mach1 from '../images/mustang_mach_1.jpg';
import BackCarVision from '../images/back_car_vision.jpg';
import CarsRow from '../images/cars_row.png';
import TunningIcon from '../images/tunning_icon.png';
import './About.css';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className='about'>
            <Title title="ABOUT US" id="about" />
            <section className='section' id='section-1'>
                <div className='section-container container'>
                    <h3>Our Story</h3>
                    <p>It was one summer evening, driving on the road, that our founder thought about how great it would be to have a service that could help people find a vehicle that perfectly met their needs and budget. talking about how great it would be to have a service that could help us find the best price for a car. After some research, we decided that we needed to create our own company. And so, Noite Automóveis was founded. We started with just a small office, but quickly grew to become one of the largest car buying and selling companies in the country.</p>
                    <img src={ManAtNight} alt="Man At Night" />
                    <p>Our success is due to our commitment to excellence and our customer focus. We are always looking for ways to improve our services and provide our customers with the best experience possible. We are proud to be a company that offers quality service and cares about its customers. If you are looking to buy or sell a car, don't hesitate to contact us. We're here to help you find the best deal possible.</p>
                </div>
            </section>
            <section className='section' id='section-2'>
                <div className='content content-1 container'>
                    <div className="content__text">
                        <h3>Our Vision</h3>
                        <p>Our vision is to be the leading company in buying and selling cars in the country. We want to offer our customers the best possible experience, with competitive prices and excellent service.</p>
                        <p>We are committed to excellence in everything we do. We are always looking for ways to improve our services and offer our customers the best experience possible.</p>
                        <p>We are also committed to customer service. We are always putting the customer first and strive to meet their needs.</p>
                        <p>We are confident that with our commitment to excellence and customer service, we can go from strength to strength.</p>
                    </div>
                    <img src={Velocimeter} alt="Velocimeter" />
                </div>
                <div className='content content-1 container'>
                    <img src={BackCarVision} alt="Back Car Vision" />
                    <div className="content__text">
                        <h3>Our Mission</h3>
                        <p>Our company exists to help people buy and sell cars. We want to make the process as easy and convenient as possible so that our customers can find the perfect car for their needs and have the best buying and selling experience.</p>
                        <p>With a commitment to excellence, we are always looking for ways to improve our services and offer our customers a better experience.</p>
                        <p>Because of our commitment to excellence and customer service, we are confident that we can help people buy and sell cars with ease and confidence.</p>
                    </div>
                </div>
                <div className='content content-1 container'>
                    <div className="content__text">
                        <h3>Our Vision</h3>
                        <p>Our values are:</p>
                        <ul>
                            <li>Excellence: We are committed to excellence in everything we do. We are always looking for ways to improve our services and offer our customers the best experience possible.</li>
                            <li>Integrity: We are honest and trustworthy. We always put the customer first and strive to meet their needs.</li>
                            <li>Respect: We respect our customers, employees and partners. We value diversity and inclusion and are committed to a positive and collaborative work environment.</li>
                        </ul>
                        <p>Thanks to our values, we are confident that we can offer our customers the best possible experience when buying and selling cars.</p>
                    </div>
                    <img src={Mach1} alt="Mustang Mach 1" />
                </div>
            </section>
            <section className='section' id='section-3'>
                <div className="services-container">
                    <h3 id='services'>Services</h3>
                    <div className="services">
                        <div className="services__info">
                            <h4>Sales And Purchase</h4>
                            <p>Buying and selling vehicles, whether cars and motorcycles, new or used</p>
                        </div>
                        <div className="services__img">
                            <img src={CarsRow} alt="Cars Row" />
                        </div>
                    </div>
                    <hr className='services__row' />
                    <div className="services">
                        <div className="services__img">
                            <img src={TunningIcon} alt="Tunning Icon" />
                        </div>
                        <div className="services__info">
                            <h4>Tunning</h4>
                            <p>Car customization in general. Painting, accessories or mechanical modifications</p>
                        </div>
                    </div>
                    <Link to="/products" className='button--blue services-button'>Our Products</Link>
                </div>
            </section>
        </div>
    )
}

export default About;
