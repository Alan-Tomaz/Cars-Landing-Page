import React from 'react'
import Title from '../components/Title';
import './Contact.css';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Contact() {
    return (
        <div className='contact'>
            <Title title="CONTACT US" />

            <section className="contact-section">
                <div className="section__contact-us">
                    <div className="contact-us__ways">
                        <div className="contact-us__way">
                            <FaPhoneAlt className='contact-us__way-icon' />
                            <div className="contact-us__info">
                                <h6>Phone Number</h6>
                                <span>+1243 3564 4568</span>
                            </div>
                        </div>
                        <div className="contact-us__way">
                            <MdEmail className='contact-us__way-icon' />
                            <div className="contact-us__info">
                                <h6>E-mail Address</h6>
                                <span>nightcall@gmail.com</span>
                            </div>
                        </div>
                        <div className="contact-us__way">
                            <FaLocationDot className='contact-us__way-icon' />
                            <div className="contact-us__info">
                                <h6>Location</h6>
                                <span>123, Bussines Avenue, NYC</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us__form">
                        <h3>Contact Us</h3>
                        <p>Fill out the form to contact us, or see our other contact methods. We'd love to help you!</p>
                        <form >
                            <input type="text" placeholder='Name' />
                            <input type="text" placeholder='E-mail' />
                            <textarea cols="30" rows="10" placeholder='Message'></textarea>
                            <a className='button--blue contact-us__button-2'>Send</a>
                        </form>
                    </div>
                </div>
            </section>
            <section className="map-section">
                <h3>Find us on Google Maps</h3>
                <p>You can also come to one of our stores in person! We will love to welcome you</p>
                <img src="https://t.ctcdn.com.br/TsDYMux-ZlhMhRe2LOni3S_3aTk=/1200x675/smart/i381158.jpeg" alt="" />
            </section>
        </div>
    )
}

export default Contact
