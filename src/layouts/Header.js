import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../img/dorisLogo.png'

const list = [
    {
        name: 'O nas',
        path: '/about'
    },
    {
        name: 'Projekty',
        path: '/projects'
    },
    {
        name: 'Kontakt',
        path: '/contact'
    }
]

const Header = () => {
    const menu = list.map(item => (
        <li key={item.name} className="site-nav__item">
            <NavLink className="site-nav__link" to={item.path}>{item.name}</NavLink>
        </li>

    ))

    return (
        <nav className="site-nav">
            <NavLink className="site-nav__link" to="/"><img className="site-nav__img" src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
            <ul className="site-nav__list">
                {menu}
            </ul>
        </nav>
    );
}

export default Header;