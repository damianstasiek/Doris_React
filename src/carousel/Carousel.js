import React, { Component } from 'react';
import ImageSlide from './ImageSlide'
import Arrow from './Arrow'
import '../styles/Carousel.scss'

class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentImageIndex: 0,
            project: [],
            image: '',
            class: '',
            dots: ''
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }
    componentDidMount() {
        this.setupAutoplay();
    }

    componentWillUnmount() {
        this.stopAutoplay();
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }
    componentWillReceiveProps() {
        const dots = [...document.querySelectorAll('.image-dot')]

        if (dots.length > 0) {
            dots[0].classList.add('active')
        }

    }
    setupAutoplay = () => {
        this.timerId = setInterval(this.nextSlide, 5000)
    }
    stopAutoplay = () => {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    previousSlide() {
        console.log('left')
        const lastIndex = this.props.projects.length - 1;
        const { currentImageIndex } = this.state;
        const shouldRestIndex = currentImageIndex === 0;
        const index = shouldRestIndex ? lastIndex : currentImageIndex - 1;

        this.setState({
            currentImageIndex: index,
        });
    }
    nextSlide() {
        console.log('right')
        const dots = [...document.querySelectorAll('.image-dot')]
        dots[this.state.currentImageIndex].classList.add('active')
        const lastIndex = this.props.projects.length - 1;
        const { currentImageIndex } = this.state;
        const shouldRestIndex = currentImageIndex === lastIndex;
        const index = shouldRestIndex ? 0 : currentImageIndex + 1;
        this.setState({
            currentImageIndex: index,
        });
        this.changeDot(dots);
    }
    changeDot = (dots) => {
        const activeDot = dots.findIndex(dot => dot.classList.contains('active'));
        dots[activeDot].classList.remove('active')
        dots[this.state.currentImageIndex].classList.add('active')
    }
    handleMouseOver = () => {
        console.log('mouseOver')
        this.isMouseOver = true;
        this.stopAutoplay();
    }
    handleMouseOut = () => {
        console.log('mouseOut')
        this.isMouseOver = false;
        this.setupAutoplay();
    }
    handleDot(id, e) {
        const dots = [...document.querySelectorAll('.image-dot')]
        dots[this.state.currentImageIndex].classList.remove('active')
        dots[id].classList.add('active')
        this.stopAutoplay();
        this.setState({ currentImageIndex: id })
        this.setupAutoplay();


    }

    render() {
        const project = { ...this.props.projects[this.state.currentImageIndex] };
        let image = ''
        if (project.gallery) {
            image = project.gallery.filter(item => item.headerImage === true).map(item => item.image)
        }
        const dots = this.props.projects.map((item, index) => (
            <div key={index} id={index} className={`image-dot`} onClick={(e) => this.handleDot(index, e)}><i className="fas fa-circle"></i></div>
        ))
        if (this.props.projects.length > 0) {
            return (
                <div className="carousel"
                // onMouseOver={this.handleMouseOver}
                // onMouseOut={this.handleMouseOut}
                >
                    <Arrow
                        direction="left"
                        clickFunction={this.previousSlide}
                        glyph="<" />
                    <ImageSlide url={image} title={project.title} id={project.id} animation={this.state.class} />
                    <Arrow
                        direction="right"
                        clickFunction={this.nextSlide}
                        glyph=">" />
                    <div className="image-dot__container">
                        {dots}
                    </div>

                </div>
            );
        } else {
            return (
                <div>...</div>
            )
        }

    }
}

export default Carousel;