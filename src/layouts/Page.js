import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
        console.log(this.props.location)
        console.log(this.state.projects)
        return (
            <Route
                render={({ location }) => (
                    <TransitionGroup className="content" >
                        <CSSTransition
                            key={location.key}
                            timeout={500}
                            classNames="fade"
                        >
                            <Switch location={location}>
                                <Route path="/" exact render={props => <HomePage {...props} projects={this.state.projects} />} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/projects" render={props => <ProjectsList {...props} data={this.state} />} />
                                <Route path="/projects/:id" exact render={props => <Project {...props} data={this.state} />} />
                                <Route exact path="/contact" component={Contact} />
                                <Route path="/admin" component={AdminPage} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </CSSTransition>
                    </ TransitionGroup>
                )}
            />

        );
    }
}

export default Page;


