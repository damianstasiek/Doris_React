import React, { Component } from 'react';
import '../styles/AdminAddProject.css'
import * as firebase from 'firebase'

class AdminAddProjects extends Component {
    previousLocation = this.props.location;
    refProjects = firebase.firestore().collection('projects')
    state = {
        images: [],
        title: '',
        imgAlt: '',
        description: '',
        gallery: [],
        progress: 0
    }
    fileInput = React.createRef();
    data = this.props.extra;
    match = this.props.match;

    componentDidUpdate() {
        if (this.state.images) {
            this.handleAddGallery();
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSubmitGallery = (event) => {
        event.preventDefault();
        const images = {
            adres: this.fileInput.current.files[0],
        }
        this.setState({ images: [...this.state.images, images] })
        console.log(images)
    }

    handleAddGallery = () => {
        const { images, title } = this.state
        const gallery = {}
        images.forEach((image) => {
            const uploadTask = firebase.storage().ref(`images/${title}/${image.adres.name}`).put(image.adres);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    this.setState({ progress })
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    firebase.storage().ref(`images/${title}`).child(image.adres.name).getDownloadURL().then(url => {
                        gallery.image = url;
                        gallery.imgAlt = this.state.imgAlt
                        this.setState({ gallery: [...this.state.gallery, gallery] })
                    })
                });
            this.setState({
                images: [],
            })
        })
    }
    handleDelteImg = (id) => {
        let gallery = this.state.gallery.slice();
        gallery = gallery.filter(img => id !== img.image)
        this.setState({ gallery })
    }

    addProject = () => {
        const { title, description, gallery } = this.state;
        this.refProjects.add({
            title,
            description,
            gallery
        }).then(() => {
            const projects = [];
            this.refProjects.get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    const item = doc.data()
                    item.id = doc.id
                    projects.push(item)
                })
                this.setState({ projects })
                this.props.add(projects);
            })
        }).then((docRef) => {
            this.setState({
                image: [],
                title: '',
                description: '',
                gallery: [],
                imgAlt: ''
            });
            // this.props.history.push("/")
        }).catch((error) => {
            console.error("Error adding doucment: ", error)
        });
        alert('Projekt dodany')
    }
    render() {
        const bgWhite = {
            backgroundColor: '#fff'
        }
        const transparent = {
            backgroundColor: 'transparent'
        }
        // console.log(this.props.extra.projects)
        console.log(this.match.url)
        console.log(this.props)
        // console.log(this.state.images)
        // console.log(this.state.gallery)
        const { url } = this.match
        const imgGallery = this.state.gallery.map(img =>
            <div key={img.imgAlt} className="form__gallery__img">
                <h4>{img.imgAlt}</h4>
                <img src={img.image} className="img-responsive" alt={img.title} />
                <button className="form__btn form__btn--delete" onClick={() => this.handleDelteImg(img.image)}>Usuń</button>
            </div>
        )
        return (
            <div className="container" >
                <h2>Opis</h2>
                <form className="form-container">
                    <div className="form-group">
                        <label htmlFor="title">Tytuł projektu</label>
                        <div className="form-field">
                            <input type="text" id="title" name="title" value={this.state.username} onChange={this.handleChange} placeholder="Tytuł projektu" />
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptiom">Opis</label>
                        <div className="form-field">
                            <textarea name="description" id="description" cols="30" rows="10" onChange={this.handleChange} placeholder="Opis projektu"></textarea>
                        </div>
                    </div>
                </form>
                <h2>Galleria</h2>
                <form className="form-container" onSubmit={this.handleSubmitGallery}>
                    <div className="form-group">
                        <label htmlFor="imgTitle">Opis zdjęcia</label>
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
                <div className="form__gallery" style={this.state.gallery.length > 0 ? bgWhite : transparent}>
                    {imgGallery}
                </div>
                <button className="form__btn form__btn--big" onClick={this.addProject}>Dodaj projekt</button>
            </div >
        );
    }
}

export default AdminAddProjects;