import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import AdminProjectList from './AdminProjectList'
import AdminAddProjects from './AdminAddProject';
import AdminEditProject from './AdminEditProject'
import '../styles/AdminPage.css'



class AdminPage extends Component {
    state = {}
    render() {
        return (
            <>
                <Link to="/admin/nowy" >
                    <button className="project__btn project__btn--add">Dodaj projekt </button>
                </Link>
                <hr />
                <div className="wrap">
                    <div className="left">
                        {< AdminProjectList />}
                    </div>
                    <div className="right">
                        <Switch>
                            <Route path="/admin/nowy" component={AdminAddProjects} />
                            <Route path="/admin/edit" component={AdminEditProject} />
                        </Switch>
                    </div>

                </div>
            </>

        );
    }
}

export default AdminPage;