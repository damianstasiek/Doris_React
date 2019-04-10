import React, { Component } from 'react';
import logo from '../img/dorisLogo.png'
import { NavLink } from 'react-router-dom'
import * as firebase from 'firebase'

class HeaderPage extends Component {
    state = {
        image: ''
    }

    refProjects = firebase.firestore().collection('projects')
    out = false;
    componentDidMount() {
        console.log('Mount......................................................')
        if (this.props.class === '__projects') {
            const id = this.props.match.params.id
            console.log(id)
            this.refProjects.doc(id).get()
                .then(snapshot => {
                    const project = snapshot.data();
                    const image = project.gallery.filter(item => item.headerImage === true).map(item => item.image)
                    this.setState({ image })
                })
        }
        window.addEventListener('scroll', this.handleScroll)
        document.querySelector('.nav__links')
        if (this.props.location.pathname === '/') {
            document.body.style = "background-color: #1E1E1E;"
        } else {
            document.body.style = "background-color: #fff;"
            document.querySelectorAll('.nav__links').forEach(link => {
                link.style = "color: black"
            })
        }

    }
    componentWillReceiveProps(props) {
        console.log('get props _____________________________________________')
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    // handleScroll(e) {
    //     const scrollValue = window.scrollY;
    //     const header = document.querySelector('header')
    //     header.classList.add('active')
    //     if (scrollValue == 0) {
    //         header.classList.remove('active')
    //     }
    // }
    toggleMenu = (e) => {
        console.log(e.target.className)
        const mainNav = document.querySelector('.main-nav');
        const navItem = document.querySelectorAll('.nav__item')
        const navSocial = document.querySelector('.nav__social')
        const iconBurger = document.querySelector('.fa-bars')
        const iconX = document.querySelector('.fa-times')
        if (this.out) {
            navItem.forEach(item => item.classList.remove('active'))
            navSocial.classList.remove('active');
            setTimeout(() => { mainNav.classList.remove('active') }, 500)
            this.out = false;
        } else {
            mainNav.classList.add('active');
            setTimeout(() => { navSocial.classList.add('active') }, 1000);
            setTimeout(() => { navItem.forEach(item => item.classList.add('active')) }, 1000);
            this.out = true
        }
        document.body.classList.toggle('menu-open')
        iconBurger.classList.toggle('show');
        iconX.classList.toggle('show');
    }

    render() {
        document.body.classList.remove('menu-open')
        const { image } = this.state
        console.log(image);
        const bgImage = {
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }
        const none = {}
        console.log(this.state)
        console.log(this.state.image)
        console.log(this.props)
        console.log(this.props.menu)
        console.log(this.props.match.params.id)
        const menu = this.props.menu.map(item => (
            <li key={item.name} className={`nav__item ${item.class}`}>
                <NavLink className="nav__links" to={item.path}>{item.name}</NavLink>
            </li>
        ))
        return (
            <header className={`header${this.props.class}`} style={image ? bgImage : none}>

                <nav className="navbar">
                    <div className="nav-toggle">
                        <NavLink className="nav__link" to="/"><img src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
                        <i className="nav-icon fas fa-bars show" onClick={this.toggleMenu}></i>
                        <i className="nav-icon fas fa-times" onClick={this.toggleMenu}></i>
                    </div>
                    <ul className="main-nav">
                        {menu}
                        <div className="nav__social">
                            <a className="nav__social__links" href="https://www.facebook.com/dorisdesignservices/">
                                <i className="fab fa-facebook-square"></i>
                            </a>
                            <a className="nav__social__links" href="https://www.instagram.com/dorisdesignservices/">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default HeaderPage;
