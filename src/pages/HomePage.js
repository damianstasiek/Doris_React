import React, { Component } from 'react';
import Carousel from '../carousel/Carousel'
import * as firebase from 'firebase'


class HomePage extends Component {
    state = {
        projects: []
    }
    i = 0
    refProjects = firebase.firestore().collection('projects')
    componentDidMount() {
        const projects = [];
        this.refProjects.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const item = doc.data()
                item.id = doc.id
                projects.push(item)
            })
            this.setState({ projects })
        })

    }
    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <section className="homePage">
                <Carousel projects={this.state.projects} />
            </section>
        );
    }
}

export default HomePage;
