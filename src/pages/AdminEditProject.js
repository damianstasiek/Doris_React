import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase'

class AdminEditProject extends Component {
    state = {
        title: '',
        description: '',
        images: [],
        imgAlt: '',
        headerImage: false,
        gallery: [],
        progress: 0
    }
    previousLocation = this.props.location;
    refProjects = firebase.firestore().collection('projects')
    fileInput = React.createRef();

    componentDidMount() {
        const id = this.props.match.params.id
        const projects = this.refProjects.doc(id).get()
            .then(snapshot => {
                const project = snapshot.data();
                console.log(project)
                this.setState({
                    title: project.title,
                    description: project.description,
                    gallery: project.gallery,
                })
            })
        console.log(projects)
    }
    componentDidUpdate() {
        if (this.state.images) {
            this.handleAddGallery();
        }
    }
    handleChangeInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'headerImage') {
            value = e.target.checked;
        }
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                [name]: value
            }
        }))
    }
    handleSubmitGallery = (event) => {
        event.preventDefault();
        const images = {
            adres: this.fileInput.current.files[0],
            headerImage: this.state.headerImage
        }
        this.setState({
            images: [...this.state.images, images],
            headerImage: false
        })
    }
    handleUpdate = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        this.refProjects.doc(id).update({
            title: this.state.title,
            description: this.state.description,
            gallery: this.state.gallery
        })
    }
    handleAddGallery = () => {
        const { images } = this.state
        const gallery = {}
        images.forEach((image) => {
            const uploadTask = firebase.storage().ref(`images/${image.adres.name}`).put(image.adres);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    this.setState({ progress })
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    firebase.storage().ref(`images`).child(image.adres.name).getDownloadURL().then(url => {
                        console.log(url)
                        gallery.image = url;
                        gallery.imgAlt = this.state.imgAlt
                        gallery.headerImage = image.headerImage
                        this.setState({ gallery: [...this.state.gallery, gallery] })
                    })
                });
            this.setState({
                images: [],
            })
        })
    }
    handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'headerImage') {
            value = e.target.checked;
        }
        this.setState({
            [name]: value
        })
    }
    handleDelteImg = (id) => {
        let gallery = this.state.gallery.slice();
        gallery = gallery.filter(img => id !== img.image)
        this.setState({ gallery })
        console.log(gallery)
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        const bgWhite = {
            backgroundColor: '#fff'
        }
        const transparent = {
            backgroundColor: 'transparent'
        }
        const { title, description, imgAlt, headerImage, progress, gallery } = this.state
        const checkbocDisplay = this.state.gallery.filter(item => item.headerImage === true)
        let imgGallery = [];
        imgGallery = this.state.gallery.map(img =>
            <div key={img.image} className="form__gallery__img">
                <h4 className="form__gallery__header">{img.imgAlt}</h4>
                {img.headerImage ? <p>Zdjęcie główne</p> : ''}
                <img src={img.image} className="img-responsive" alt={img.title} />
                <button className="form__btn form__btn--delete" onClick={() => this.handleDelteImg(img.image)}>Usuń</button>
            </div>
        )
        if (this.state.title) {
            return (
                <>
                    <Link to="/admin/projects">
                        <button className="form__btn form__btn--delete"><i className="fas fa-arrow-left menu__icon" ></i>Powrót</button>
                    </Link>
                    <div className="container" >
                        <form className="form-container">
                            <div className="form-group">
                                <label htmlFor="title">Tytuł projektu</label>
                                <div className="form-field">
                                    <input type="text" id="title" name="title" value={title} onChange={this.handleChangeInput} placeholder="Tytuł projektu" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descriptiom">Opis</label>
                                <div className="form-field">
                                    <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={this.handleChangeInput} placeholder="Opis projektu"></textarea>
                                </div>
                            </div>
                        </form>
                        <h2>Gallery</h2>
                        <form className="form-container" onSubmit={this.handleSubmitGallery}>
                            <div className="form-group">
                                <label htmlFor="imgTitle">Opis</label>
                                <div className="form-field">
                                    <input type="text" id="imgAlt" name="imgAlt" value={imgAlt} onChange={this.handleChange} placeholder="Opis zdjęcia" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Zdjęcia</label>
                                <div className="form-field">
                                    <input type="file" name="image" id="image" accept="image/*" ref={this.fileInput} />
                                </div>
                            </div>
                            {checkbocDisplay.length > 0 ? '' : <div className="form-group form-group--checkbox">
                                <label htmlFor="headerImage" className="checkbox-label">Czy zdjęcie główne?</label>
                                <input type="checkbox" value={headerImage} onChange={this.handleChange} name="headerImage" id="headerImage" />
                            </div>}
                            <div className="form-group form-group--column">
                                <button className="form__btn" type="sumbit">Dodaj zdjęcie</button>
                                <progress value={progress} max="100" />
                            </div>
                        </form>
                        <div className="form__gallery" style={gallery.length > 0 ? bgWhite : transparent}>
                            {imgGallery}
                        </div>
                        <button className="form__btn form__btn--big" onClick={this.handleUpdate}>Uaktualnij projekt</button>
                    </div >
                </>
            );
        } else {
            return (
                <div>Loading project ...</div>
            )
        }
    }
}

export default AdminEditProject;
