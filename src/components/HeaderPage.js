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
        if (this.props.class === 'header__projects') {
            const id = this.props.match.params.id
            console.log(id)
            this.refProjects.doc(id).get()
                .then(snapshot => {
                    const project = snapshot.data();
                    const image = project.gallery.filter(item => item.headerImage === true).map(item => item.image)
                    this.setState({ image })
                })
        }

    }
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
        iconBurger.classList.toggle('show');
        iconX.classList.toggle('show');
    }

    render() {
        const { image } = this.state
        const bgImage = {
            background: `url(${image}) no-repeat center center fixed`,
            backgroundSize: 'cover',
        }
        const none = {}
        const projectId = this.props.match.params.id
        console.log(this.state)
        console.log(this.state.image)
        console.log(this.props)
        console.log(this.props.menu)
        console.log(this.props.match.params.id)
        const menu = this.props.menu.map(item => (
            <li key={item.name} className="nav__item">
                <NavLink className="nav__links" to={item.path}>{item.name}</NavLink>
            </li>
        ))
        return (
            <header className={this.props.class} style={projectId ? bgImage : none}>

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

// const HeaderPage = (props) => {
//     console.log(props)
//     console.log(props.menu)
//     console.log(props.match.params.id)
//     const menu = props.menu.map(item => (
//         <li key={item.name} className="site-nav__item">
//             <NavLink className="site-nav__link" to={item.path}>{item.name}</NavLink>
//         </li>
//     ))
//     return (
//         <div className={props.class}>
//             <nav className="site-nav">
//                 <NavLink className="site-nav__link" to="/"><img className="site-nav__img" src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
//                 <ul className="site-nav__list">
//                     {menu}
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default HeaderPage;