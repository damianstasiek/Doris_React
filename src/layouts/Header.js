import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'
import HeaderPage from '../components/HeaderPage';

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
    },
    {
        name: 'Admin',
        path: '/admin'
    }
]

const Header = (props) => {
    console.log(list)
    // const adres = props.location.pathname;
    console.log(props.location.pathname)
    console.log(props)
    return (
        <>
            <Route path="/" exact render={props => <HeaderPage {...props} menu={list} class="header" />} />
            <Route path="/contact" render={props => <HeaderPage {...props} menu={list} class="header" />} />
            <Route path="/projects" render={props => <HeaderPage {...props} menu={list} class="header" />} />
            <Route path="/about" render={props => <HeaderPage {...props} menu={list} class="header" />} />
            <Route path="/project/:id" render={props => <HeaderPage {...props} menu={list} class="header__projects" />} />


        </>
    );
}

export default withRouter(Header);