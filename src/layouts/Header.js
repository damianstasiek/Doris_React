import React from 'react';
import { Route, withRouter } from 'react-router-dom'
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
            <Route path="/" exact render={props => <HeaderPage {...props} menu={list} class="" />} />
            <Route exact path="/contact" render={props => <HeaderPage {...props} menu={list} class="--white" />} />
            <Route exact path="/projects" render={props => <HeaderPage {...props} menu={list} class="--white" />} />
            <Route path="/about" render={props => <HeaderPage {...props} menu={list} class="--white" />} />
            <Route path="/projects/:id" render={props => <HeaderPage {...props} menu={list} class="__projects" />} />

        </>
    );
}

export default withRouter(Header);