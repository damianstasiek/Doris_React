import React from 'react';
import '../styles/Contact.scss'

const Contact = () => {
    return (
        <div className="wrap-contact">
            <form className="contact-form">
                <span className="contact-form-title">Napisz do nas</span>
                <div className="wrap-input">
                    <span className="label-input">Imię</span>
                    <input className="input" type="text" name="name" placeholder="Wprowadź swoje imię" />
                </div>
                <div className="wrap-input">
                    <span className="label-input">Adres email</span>
                    <input className="input" type="email" name="email" placeholder="Wprowadź swój adres email" />
                </div>
                <div className="wrap-input">
                    <span className="label-input">Telefon</span>
                    <input className="input" type="email" name="email" placeholder="Wprowadź swój numer telefonu" />
                </div>
                <div className="wrap-input">
                    <span className="label-input">Wiadomość</span>
                    <textarea className="input input-textarea" name="message" placeholder="Twoja wiadomość..."></textarea>
                </div>
                <div className="container-contact-form-btn">
                    <button className="contact-form-btn">
                        <span>Wyślij<i className="fas fa-long-arrow-alt-right btn-form-icon"></i></span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Contact;