import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/AdminProject.css'


const AdminProject = (props) => {
    console.log(props)
    const projectItem = props.projects.map((project) => (
        <div key={project.id} className="project__item">
            <h3 className="project__item__header">{project.title}</h3>
            <img src={project.gallery ? project.gallery[0].image : 'https://via.placeholder.com/150'} alt="" />
            <div className="project__dropdown">
                <button className="project__btn">Zarządzaj projektem</button>
                <div className="project__dropdown__content">
                    <li><Link to={`/admin/edit/${project.id}`}>Edytuj</Link></li>
                    <li onClick={() => props.remove(project.id)}> Usuń</li>
                    {/* <a href="#">Wyłącz</a> */}
                </div>
            </div>

        </div>
    )
    )
    return (
        <>
            <div className="project__list">
                {projectItem}
            </div>
        </>
    );
}

export default AdminProject;