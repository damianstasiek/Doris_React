import React, { Component } from 'react';
// import Slide from 'react-reveal/Slide';
import '../styles/Project.scss';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

class Projects extends Component {
    state = {
        projects: [],
        id: ''
    }
    componentDidMount() {
        if (!this.state.id) {
            const id = this.props.match.params.id;
            this.setState({ id })
            console.log('-----------------------------------------------')
        }
        const projects = [];
        const firestore = firebase.firestore();
        const rootRef = firestore.collection('projects')
        rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const item = doc.data()
                item.id = doc.id
                projects.push(item)
            });
            this.setState({
                projects
            })
        })
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(e) {
        // console.log(e)
        const scrollValue = window.scrollY;
        const windowHeight = window.innerHeight;
        const images = [...document.querySelectorAll('.project__gallery__item')];
        images.forEach(img => {
            const imageFromTop = img.offsetTop;
            const imageHeight = img.offsetHeight;
            if (scrollValue > imageFromTop + imageHeight - windowHeight + 600) {
                img.classList.add('active')
            }
            if (scrollValue < 100) {
                img.classList.remove('active')
            }
        })
    }

    render() {
        const { projects, id } = this.state;

        // const id = this.props.match.params.id;
        console.log(this.props)
        let project = projects.filter(item => id === item.id).map(item => (
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
            <div className="project__container">
                {project}
                <Link to={`/projects`}>
                    <div className="project__btn--back">Powrót</div>
                </Link>
            </div >
        );
    }
}

export default Projects;

