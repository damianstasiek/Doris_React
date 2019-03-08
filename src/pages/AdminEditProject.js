import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase'
class AdminEditProject extends Component {
    state = {
        project: '',
        images: [],
        imgAlt: '',
        gallery: []
    }
    previousLocation = this.props.location;
    refProjects = firebase.firestore().collection('projects')
    fileInput = React.createRef();
    componentDidMount() {
        const id = this.props.match.params.id
        const project = this.props.extra.projects.filter(item => id === item.id)
        console.log(project)
        this.setState({
            project: project[0],
            gallery: [...project[0].gallery]
        })
        console.log(this.state.gallery)
    }
    componentDidUpdate() {
        if (this.state.images) {
            console.log('gallery')
            this.handleAddGallery();
        }
    }
    componentWillMount() {
        console.log('juz')
    }
    handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const project = { ...this.state.project };
        console.log(project)
        project.title = e.target.value;
        this.setState(prevState => ({
            project: {
                ...prevState.project,
                [name]: value
            }
        }))
    }
    handleSubmitGallery = (event) => {
        console.log('już')
        event.preventDefault();
        const images = {
            adres: this.fileInput.current.files[0],
        }
        this.setState({ images: [...this.state.images, images] })
        console.log(images)
    }
    handleUpdate = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        console.log(id)
        const update = this.refProjects.doc(id).update({
            title: this.state.project.title,
            description: this.state.project.description,
            gallery: this.state.gallery
        })
    }
    handleAddGallery = () => {
        const { images } = this.state
        console.log(images)
        // const { gallery } = this.state.project.gallery
        const gallery = {}
        console.log(this.state.project.gallery)
        const img = {}
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
                        console.log(gallery)
                        this.setState({ gallery: [...this.state.gallery, gallery] })
                        console.log(gallery)
                        console.log(this.state.project)
                    })
                });
            this.setState({
                images: [],
            })
        })
    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        const bgWhite = {
            backgroundColor: '#fff'
        }
        const transparent = {
            backgroundColor: 'transparent'
        }
        const { project } = this.state
        console.log(project)
        console.log(this.state.gallery)
        // console.log(project.gallery)
        let imgGallery = [];
        if (project) {
            imgGallery = this.state.gallery.map(img =>
                <div key={img.imgAlt} className="form__gallery__img">
                    <h4>{img.imgAlt}</h4>
                    <img src={img.image} className="img-responsive" alt={img.title} />
                    <button className="form__btn form__btn--delete">Usuń</button>
                </div>
            )
        }
        if (project) {
            return (
                <>
                    <Link to="/admin/projects">
                        <button className="form__btn form__btn--delete"><i className="fas fa-arrow-left menu__icon" ></i>Powrót</button>
                    </Link>
                    <form onSubmit={this.handleUpdate}>
                        <input type="text" value={project.title} onChange={this.handleChangeInput} />
                        <button type="sumbit">Update</button>
                    </form>
                    <div className="container" >
                        <form className="form-container">
                            <div className="form-group">
                                <label htmlFor="title">Tytuł projektu</label>
                                <div className="form-field">
                                    <input type="text" id="title" name="title" value={project.title} onChange={this.handleChangeInput} placeholder="Tytuł projektu" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="descriptiom">Opis</label>
                                <div className="form-field">
                                    <textarea name="description" id="description" cols="30" rows="10" value={project.description} onChange={this.handleChangeInput} placeholder="Opis projektu"></textarea>
                                </div>
                            </div>
                        </form>
                        <h2>Gallery</h2>
                        <form className="form-container" onSubmit={this.handleSubmitGallery}>
                            <div className="form-group">
                                <label htmlFor="imgTitle">Opis</label>
                                <div className="form-field">
                                    <input type="text" id="imgAlt" name="imgAlt" value={this.state.imgAlt} onChange={this.handleChange} placeholder="Opis zdjęcia" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Zdjęcia</label>
                                <div className="form-field">
                                    <input type="file" name="image" id="image" accept="image/*" ref={this.fileInput} />
                                </div>
                            </div>
                            <div className="form-group form-group--column">
                                <button className="form__btn" type="sumbit">Dodaj zdjęcie</button>
                                <progress value={this.state.progress} max="100" />
                            </div>
                        </form>
                        <div className="form__gallery" style={this.state.project.gallery.length > 0 ? bgWhite : transparent}>
                            {imgGallery}
                        </div>
                        <button className="form__btn form__btn--big" onClick={this.handleUpdate}>Dodaj projekt</button>
                        <Link to="/admin">Powrót</Link>
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
