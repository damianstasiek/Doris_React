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
        console.log(e.target.parentElement.classList)
        const mainNav = document.querySelector('.main-nav');
        const navItem = document.querySelectorAll('.nav__item')
        if (this.out) {
            navItem.forEach(item => item.classList.remove('active'))
            setTimeout(() => { mainNav.classList.remove('active') }, 500)
            this.out = false;
        } else {
            mainNav.classList.add('active');
            setTimeout(() => { navItem.forEach(item => item.classList.add('active')) }, 1000)
            this.out = true
        }
        console.log('działa')
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
                    <div className="nav-toggle" onClick={this.toggleMenu}>
                        <NavLink className="nav__link" to="/"><img src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
                        <i className="fas fa-bars"></i>

                    </div>
                    <ul className="main-nav">
                        {menu}
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