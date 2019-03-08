import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import AdminProjectList from './AdminProjectList'
import AdminAddProjects from './AdminAddProject';
import AdminEditProject from './AdminEditProject'
import '../styles/AdminPage.css'
import * as firebase from 'firebase'


class AdminPage extends Component {
    state = {
        projects: []
    }
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
    navigationList = [
        { name: "Dodaj projekt", path: "/admin/nowy", exact: true, icon: "fas fa-plus" },
        { name: "Lista projektów", path: "/admin/projects", exact: true, icon: "fas fa-list" },
    ]
    handleRemove = (id) => {
        let projects = this.state.projects.slice()
        projects = projects.filter(project => id !== project.id)
        firebase.firestore().collection('projects').doc(id).delete()
        this.setState({ projects })
    }
    handleAdd = (projects) => {
        this.setState({ projects })
    }
    render() {
        console.log(this.props.location)
        console.log(this.props)
        console.log(this.state.projects)
        const menu = this.navigationList.map(item => (
            <li className="menu__item" key={item.name}>
                <Link className="menu__link" to={item.path}><i className={`${item.icon} menu__icon`}></i>{item.name}</Link>
            </li>
        ))
        return (
            <>
                <div className="admin-page__container">
                    <div className="admin-page__menu">
                        <div className="menu-head">
                            <h3>Panel administracyjny</h3>
                        </div>
                        <ul className="menu">
                            {menu}
                        </ul>
                    </div>
                    <div className="admin-page__page">
                        <Switch>
                            <Route path="/admin/projects" render={props => <AdminProjectList {...props} data={this.state} />} />
                            <Route path="/admin/nowy" render={data => <AdminAddProjects {...data} add={this.handleAdd} />} />
                            <Route path="/admin/edit/:id" exact render={data => <AdminEditProject {...data} extra={this.state} />} />
                        </Switch>
                    </div>
                </div>

            </>

        );
    }
}

export default AdminPage;