import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/ProjectList.css'


const ProjectList = (props) => {
    console.log(props.data)
    const projectsList = props.data.projects.map(project => (
        <div className="project__item" key={project.id}>
            <Link to={`/projects/${project.id}`} >
                <img src={project.gallery[0].image} alt={project.title} />
                <p className="projects__title">{project.title}</p>
            </Link>
        </div>
    ))
    return (
        <div className="project__list">
            {projectsList}
        </div>
    );
}

export default ProjectList;
