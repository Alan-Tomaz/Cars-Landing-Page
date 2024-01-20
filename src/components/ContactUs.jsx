import React from 'react'
import { Link } from 'react-router-dom';
import './ContactUs.css';

function ContactUs({ bgColor = "#cbcbcb" }) {
    return (
        <div className='contact-us' style={{ backgroundColor: bgColor }}>
            <div className="contact-us__info" >
                <h2>Contact Us</h2>
                <p>Fill out the form to contact us, or see our other contact methods. We'd love to help you!</p>
                <Link to="/contact" className='button--black contact-us__button-1'>Other Contacts</Link>
            </div>
            <form className="contact-us__form">
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='E-mail' />
                <textarea cols="30" rows="10" placeholder='Message'></textarea>
                <Link className='button--blue contact-us__button-2'>Send</Link>
            </form>
        </div>
    )
}

export default ContactUs
