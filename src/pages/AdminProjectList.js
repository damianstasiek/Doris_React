import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AdminProject from './AdminProject'
import * as firebase from 'firebase'

class AdminProjecList extends Component {
    state = {
        projects: []
    }
    refProjects = firebase.firestore().collection('projects')
    handleRemove = (id) => {
        let projects = this.state.projects.slice()
        projects = projects.filter(project => id !== project.id)
        firebase.firestore().collection('projects').doc(id).delete()
        this.setState({ projects })
    }
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
        console.log(this.state.projects)
        // const projectsList = this.state.projects.map(project => (
        //     <div key={project.title}>
        //         <Link to={`/project/${project.title}`} >
        //             {project.title}
        //         </Link>
        //     </div>
        // ))
        return (
            <div className="project" >
                <AdminProject projects={this.state.projects} remove={this.handleRemove} />
            </div>
        );
    }
}

export default AdminProjecList;