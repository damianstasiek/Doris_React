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
                        <span>Wyślij<i class="fas fa-long-arrow-alt-right btn-form-icon"></i></span>
                    </button>
                </div>
            </form>
            {/* <div className="row">
                <h4>We'd love to hear from you!</h4>
            </div>
            <div className="row input-container">
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <input type="text" required />
                        <label>Name</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input">
                        <input type="text" required />
                        <label>Email</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input">
                        <input type="text" required />
                        <label>Phone Number</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <textarea required></textarea>
                        <label>Message</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="btn-lrg submit-btn">Send Message</div>
                </div>
            </div> */}
        </div>
    );
}

export default Contact;