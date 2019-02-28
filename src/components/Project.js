import React from 'react';
// import Slide from 'react-reveal/Slide';
import '../styles/Project.css';


const Projects = (props) => {
    const gallery = props.gallery.map(item => <div key={item.img} className="project__gallery"><img src={item.img} className="img-responsive" alt={item.title} /> </div>)
    return (
        <>
            <div className="project">
                <img src={props.gallery[0].img} alt={props.title} />
                <h2 className="project__title">{props.title}</h2>
                <p className="project__description">{props.description}</p>
                {/* {gallery} */}
            </div>
        </>
    );
}

export default Projects;