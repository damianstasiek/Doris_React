import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/AdminProject.css'

const AdminProject = (props) => {
    console.log(props.projects)
    const projectItem = props.projects.map((project) => (
        <div key={project.id} className="project__item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <img src={project.gallery[0].image} alt="" />
            <div className="project__dropdown">
                <button className="project__btn">Zarządzaj projektem</button>
                <div className="project__dropdown__content">
                    <Link to="admin/edit">Edytuj</Link>
                    <li onClick={() => props.remove(project.id)}> Usuń</li>
                    <a href="#">Wyłącz</a>
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