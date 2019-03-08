import React from 'react';
import AdminProject from './AdminProject'

const AdminProjectList = (props) => {
    const { projects } = props.data;
    console.log(props)
    return (
        <div className="project" >
            <AdminProject projects={projects} remove={props.remove} />
        </div>
    );
}

export default AdminProjectList;
