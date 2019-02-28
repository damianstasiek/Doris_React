import React, { Component } from 'react';
// import Project from '../components/Project'
import { Link } from 'react-router-dom'
import '../styles/ProjectList.css'
import * as firebase from 'firebase'

class ProjectsList extends Component {
    previousLocation = this.props.location;
    state = {
        projects: []
    }

    componentDidMount() {
        const projects = [];
        var firestore = firebase.firestore();
        const rootRef = firestore.collection('projects')
        rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                projects.push(doc.data())
            });
            this.setState({
                projects
            })
        })

    }


    render() {
        console.log(this.state.projects)
        const projectsList = this.state.projects.map(project => (
            <div key={project.id}>
                <Link to={`/project/${project.title}`} >
                    {project.title}
                </Link>
            </div>
        ))
        return (
            <div className="project" >
                {projectsList}
            </div>

        );
    }
}

export default ProjectsList;
