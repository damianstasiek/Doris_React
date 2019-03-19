import React, { Component } from 'react';
// import Slide from 'react-reveal/Slide';
import '../styles/Project.scss';


class Projects extends Component {
    state = {}

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll(e) {
        console.log(e)
        const scrollValue = window.scrollY;
        const windowHeight = window.innerHeight;
        const images = [...document.querySelectorAll('.project__gallery__item')];
        images.forEach(img => {
            const imageFromTop = img.offsetTop;
            const imageHeight = img.offsetHeight;

            if (scrollValue > imageFromTop + imageHeight - windowHeight) (
                img.classList.add('active')
            )
            if (scrollValue < 100) {
                img.classList.remove('active')
            }
        })
    }
    render() {
        console.log(this.props.data.projects)
        const id = this.props.match.params.id
        console.log(this.props)
        let project = this.props.data.projects.filter(item => id === item.id).map(item => (
            <div className="project" key={item.id}>
                <h2 className="project__title">{item.title}</h2>
                <p className="project__description">{item.description}</p>
                <div className="project__gallery">
                    {item.gallery.map((img, index) => (
                        <div id={index} className="project__gallery__item" key={img.image}>
                            <img src={img.image} alt={img.imgAlt} />
                        </div>
                    ))}
                </div>
            </div>
        ))
        return (
            <>
                {project}
                {/* {/* <div className="project__footer">Następny projekt</div> */}
            </>
        );
    }
}

export default Projects;

