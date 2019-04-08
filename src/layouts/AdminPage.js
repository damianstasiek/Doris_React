import React, { Component } from 'react';
import fire, { auth } from '../Fire';
import { Route, Switch, Link } from 'react-router-dom'
import AdminProjectList from '../pages/AdminProjectList'
import AdminAddProjects from '../pages/AdminAddProject';
import AdminEditProject from '../pages/AdminEditProject'
import HeaderPage from '../components/HeaderPage'
import Login from '../pages/Login'
import '../styles/AdminPage.css'
import * as firebase from 'firebase'



class AdminPage extends Component {
    state = {
        projects: [],
        user: null
    }
    refProjects = firebase.firestore().collection('projects')
    componentDidMount() {
        this.authListener();
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
    authListener() {
        auth.onAuthStateChanged((user) => {
            // console.log(user);
            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }
    logout() {
        auth.signOut()
        // .then(() => {
        //     this.setState({
        //         user: null
        //     });
        // })
    }


    navigationList = [
        { name: "Dodaj projekt", path: "/admin/nowy", exact: true, icon: "fas fa-plus" },
        { name: "Lista projektów", path: "/admin/projects", exact: true, icon: "fas fa-list" },
        { name: "Powrót do strony", path: "/", exact: true, icon: "fas fa-home" },
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
                {!this.state.user ? (<Login />) :
                    (<div className="admin-page__container">
                        {/* <HeaderPage /> */}
                        <div className="admin-page__menu">
                            <div className="menu-head">
                                <h3>Panel administracyjny</h3>
                            </div>
                            <button onClick={this.logout}>Wyloguj</button>
                            <ul className="menu">
                                {menu}
                            </ul>
                        </div>
                        <div className="admin-page__page">
                            <Switch>
                                <Route exact path="/admin/projects" render={props => <AdminProjectList {...props} data={this.state} remove={this.handleRemove} />} />
                                <Route exact path="/admin/nowy" render={data => <AdminAddProjects {...data} add={this.handleAdd} />} />
                                <Route exact path="/admin/edit/:id" component={AdminEditProject} />
                            </Switch>
                        </div>
                    </div>)
                }
            </>

        );
    }
}

export default AdminPage;