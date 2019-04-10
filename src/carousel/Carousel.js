import React, { Component } from 'react';
import ImageSlide from './ImageSlide'
import Arrow from './Arrow'
import '../styles/Carousel.scss'

class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentImageIndex: 0,
            projects: [],
            image: '',
            animating: false,
            dots: [...document.querySelectorAll('.image-dot')]
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
        const projects = { ...this.props.projects };
        this.setState({ projects })
        this.initialDot();
    }
    initialDot = () => {
        const dots = [...document.querySelectorAll('.image-dot')]
        this.setState({ dots })
        if (dots.length > 0) {
            dots[0].classList.add('active')
        }
    }
    setupAutoplay = () => {
        this.timerId = setInterval(this.nextSlide, 6000)
    }
    stopAutoplay = () => {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    previousSlide() {
        const { dots } = this.state;
        const lastIndex = this.props.projects.length - 1;
        const { currentImageIndex } = this.state;
        const shouldRestIndex = currentImageIndex === 0;
        const index = shouldRestIndex ? lastIndex : currentImageIndex - 1;
        this.setState({
            currentImageIndex: index,
        });
        this.changeDot(dots, index);
    }
    nextSlide() {
        const { dots } = this.state;
        const lastIndex = this.props.projects.length - 1;
        const { currentImageIndex } = this.state;
        const shouldRestIndex = currentImageIndex === lastIndex;
        const index = shouldRestIndex ? 0 : currentImageIndex + 1;
        this.setState({
            currentImageIndex: index,
        });
        this.changeDot(dots, index);
    }
    next = () => {
        this.stopAutoplay();
        this.nextSlide();
        this.setupAutoplay();
    }
    prev = () => {
        this.stopAutoplay();
        this.previousSlide();
        this.setupAutoplay();
    }
    onAnimationEnd = () => {
        this.setState({
            animating: false
        })
        this.setupAutoplay();
    }
    animationStart = () => {
        const num = document.getElementById('number')
        if (this.state.animation) {
            num.classList.add('active')
        } else {
            num.classList.remove('active')
        }

    }
    changeDot = (dots, id) => {
        const activeDot = dots.findIndex(dot => dot.classList.contains('active'));
        console.log(activeDot)
        dots[activeDot].classList.remove('active')
        console.log(this.state.currentImageIndex)
        dots[id].classList.add('active')
    }
    // handleMouseOver = () => {
    //     console.log('mouseOver')
    //     this.isMouseOver = true;
    //     this.stopAutoplay();
    // }
    // handleMouseOut = () => {
    //     console.log('mouseOut')
    //     this.isMouseOver = false;
    //     this.setupAutoplay();
    // }
    handleDot(id, e) {
        const { dots } = this.state;
        const num = document.getElementById('number')
        num.textContent = this.state.currentImageIndex;
        dots[this.state.currentImageIndex].classList.remove('active')
        dots[id].classList.add('active')
        this.stopAutoplay();
        this.setState({ currentImageIndex: id })
        this.setupAutoplay();


    }

    render() {
        const { currentImageIndex, animation, projects } = this.state;
        const project = { ...projects[currentImageIndex] };
        let image = ''
        if (project.gallery) {
            image = project.gallery.filter(item => item.headerImage === true).map(item => item.image)
        }
        const dots = this.props.projects.map((item, index) => (
            <div key={index} id={index} className={`image-dot`} onClick={(e) => this.handleDot(index, e)}><i className="fas active fa-circle"></i></div>
        ))
        // if (this.props.projects.length > 0) {
        return (
            <div className="carousel"
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <div className="controls">
                    <Arrow
                        direction="left"
                        clickFunction={this.prev}
                        glyph="fas fa-long-arrow-alt-left" />
                    <Arrow
                        direction="right"
                        clickFunction={this.next}
                        glyph='fas fa-long-arrow-alt-right' />
                </div>

                <div className="counter">
                    <div className="counter__current">
                        <span>0</span>
                        <span id="number">{currentImageIndex + 1}</span>
                    </div>
                    <div className="counter__total">
                        <span>0</span>
                        <span>{this.props.projects.length}</span>
                    </div>
                </div>
                <div className="carouserl__slides">
                    <ImageSlide url={image} title={project.title} id={project.id} animation={animation} />
                </div>

                <div className="image-dot__container">
                    {dots}
                </div>

            </div >
        );
        // } else {
        //     return (
        //         <div>...</div>
        //     )
    }

}

export default Carousel;