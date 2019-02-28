import React from 'react';
import { Route, Switch } from 'react-router-dom'

import HomePage from '../components/HomePage'
import About from './About';
import ProjectsList from './PorjectsList';
import Contact from './Contact';
import ErrorPage from '../components/ErrorPage'
import ProjectItem from '../components/ProjectItem';
import AdminPage from '../pages/AdminPage';

const Page = () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={About} />
                <Route path="/projects" component={ProjectsList} />
                <Route path="/project/:id" component={ProjectItem} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin" component={AdminPage} />
                <Route component={ErrorPage} />
            </Switch>
        </>
    );
}

export default Page;