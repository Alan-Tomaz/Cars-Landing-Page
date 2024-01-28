import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './ContactUs.css';
import emailjs from '@emailjs/browser';

function ContactUs({ notify, bgColor = "#cbcbcb" }) {

    const form = useRef();

    const sendEmail = (e) => {

        e.preventDefault();

        if (document.getElementById('name').value && document.getElementById('email').value && document.getElementById('message').value) {
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
        <div className='contact-us' style={{ backgroundColor: bgColor }}>
            <div className="contact-us__info" >
                <h2>Contact Us</h2>
                <p>Fill out the form to contact us, or see our other contact methods. We'd love to help you!</p>
                <Link to="/contact" className='button--black contact-us__button-1'>Other Contacts</Link>
            </div>
            <form className="contact-us__form" onSubmit={sendEmail} ref={form}>
                <input type="text" placeholder='Name' name='user_name' id='name' />
                <input type="email" placeholder='E-mail' name='user_email' id='email' />
                <textarea cols="30" rows="10" placeholder='Message' name='message' id='message'></textarea>
                <button type='submit' className='button--blue contact-us__button-2'>Send</button>
            </form>
        </div>
    )
}


export default ContactUs
