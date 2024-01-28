import React, { useRef } from 'react'
import Title from '../components/Title';
import './Contact.css';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import emailjs from '@emailjs/browser';

function Contact({ notify }) {

    const form = useRef();

    const sendEmail = (e) => {

        e.preventDefault();

        if (document.getElementById('name-2').value && document.getElementById('email-2').value && document.getElementById('message-2').value) {
            emailjs.sendForm(
                //Your Service ID
                'service_dq3725s',
                //Your Template ID
                'template_40lnnwq',
                form.current,
                //Your Publick Key
                '2MmCIHTO8aXLchsBD')
                .then((result) => {
                    console.log('Message Sent:');
                    console.log(result.text);
                    notify('success', 'Email sent')
                }, (error) => {
                    console.log(error.text);
                    notify('error', 'Error')
                });

            e.target.reset();
        }
        else {
            notify('error', 'The form cannot contain empty fields')
        }
    };

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
                        <form onSubmit={sendEmail} ref={form}>
                            <input type="text" placeholder='Name' name='user_name' id='name-2' />
                            <input type="email" placeholder='E-mail' name='user_email' id='email-2' />
                            <textarea cols="30" rows="10" placeholder='Message' name='message' id='message-2'></textarea>
                            <button type='submit' className='button--blue contact-us__button-2'>Send</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="map-section">
                <h3>Find us on Google Maps</h3>
                <p>You can also come to one of our stores in person! We will love to welcome you</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d46913.88522707928!2d-73.94694301642222!3d40.84914348078368!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1706404483537!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
    )
}

export default Contact
