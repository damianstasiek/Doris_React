import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import About from './About';
import ProjectsList from '../pages/PorjectsList';
import Contact from './Contact';
import ErrorPage from '../pages/ErrorPage'
import Project from '../components/Project'
import AdminPage from '../layouts/AdminPage';
import * as firebase from 'firebase'

class Page extends Component {
    state = {
        projects: []
    }
    componentDidMount() {
        const projects = [];
        var firestore = firebase.firestore();
        const rootRef = firestore.collection('projects')
        rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const item = doc.data()
                item.id = doc.id
                projects.push(item)
            });
            this.setState({
                projects
            })
        })
    }

    render() {
        console.log(this.state.projects)
        return (
            <>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/about" component={About} />
                    <Route path="/projects" render={props => <ProjectsList {...props} data={this.state} />} />
                    <Route path="/project/:id" exact render={props => <Project {...props} data={this.state} />} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/admin" component={AdminPage} />
                    <Route component={ErrorPage} />
                </Switch>
            </>
        );
    }
}

export default Page;


