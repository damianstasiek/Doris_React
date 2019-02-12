import React from 'react';
import Slide from 'react-reveal/Slide';
import '../styles/Project.css'

const Projects = (props) => {
    console.log(props.gallery);
    const gallery = props.gallery.map(item => <div className="project__gallery"><img key={item.img} src={item.img} className="img-responsive" alt={item.title} /> </div>
    )
    return (
        <div className="project">
            <Slide bottom cascade>
                <h2 className="project__title">{props.title}</h2>
                <p className="project__description">{props.description}</p>
                {gallery}
            </Slide>
        </div>
    );
}

export default Projects;