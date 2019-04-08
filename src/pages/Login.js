import React, { Component } from 'react';
import fire, { auth, provider } from '../Fire';
import '../styles/Contact.scss'
import { error } from 'util';

class Login extends Component {
    state = {
        email: '',
        password: '',
        user: null
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    login = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password).then((result) => {
            console.log(result)
            const user = result.user;
            this.setState({
                user
            })
        }).catch((error) => {
            console.log(error)
        })
        // e.preventDefault();
        // fire.auth().signInWithEmailAndPassword(email, password).then((u) => {
        // }).catch((error) => {
        //     console.log(error)
        // })

    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="wrap-contact">
                <form className="contact-form">
                    <span className="contact-form-title">Zaloguj się</span>
                    <div className="wrap-input">
                        <span className="label-input">Adres email</span>
                        <input className="input" type="email" name="email" placeholder="Wprowadź swój adres email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="wrap-input">
                        <span className="label-input">Hasło</span>
                        <input className="input" type="password" name="password" placeholder="Wprowadź hasło" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="container-contact-form-btn">
                        <button className="contact-form-btn" onClick={this.login}>
                            <span>Wyślij<i className="fas fa-long-arrow-alt-right btn-form-icon"></i></span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;