import React from 'react';
// import Slide from 'react-reveal/Slide';
import '../styles/Project.css';


const Projects = (props) => {
    console.log(props.data.projects)
    const id = props.match.params.id
    console.log(props)
    // const img = props.
    let project = props.data.projects.filter(item => id === item.id).map(item => (
        <div className="project" key={item.id}>
            {/* <img src={item.gallery ? item.gallery[0].image : 'https://via.placeholder.com/150'} alt={item.title} /> */}
            <h2 className="project__title">{item.title}</h2>
            <p className="project__description">{item.description}</p>
            <div className="project__gallery">
                {item.gallery.map(img => (
                    <div className="project__gallery__item">
                        <img src={img.image} alt={img.imgAlt} />
                    </div>
                ))}
            </div>
        </div>
    ))
    return (
        <>
            {project}

        </>
    );
}

export default Projects;