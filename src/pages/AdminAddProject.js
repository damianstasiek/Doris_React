import React, { Component } from 'react';
import '../styles/AdminAddProject.css'
import * as firebase from 'firebase'

class AdminAddProjects extends Component {
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
                        console.log(url);
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

    addProject = () => {
        const { title, description, gallery } = this.state;
        this.refProjects.add({
            title,
            description,
            gallery
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
        console.log(this.state.images)
        console.log(this.state.gallery)
        const addImages = this.state.gallery.map(img =>
            <div key={img.imgAlt} className="form__gallery__img">
                <h4>{img.imgAlt}</h4>
                <img src={img.image} className="img-responsive" alt={img.title} />
            </div>
        )
        return (
            <div className="container" >
                <form className="form-container">
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="title">Tytuł projektu</label>
                        </div>
                        <div className="form-field">
                            <input type="text" id="title" name="title" value={this.state.username} onChange={this.handleChange} placeholder="Tytuł projektu" />
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-label"><label htmlFor="descriptiom">Opis</label></div>
                        <div className="form-field">
                            <textarea name="description" id="description" cols="30" rows="10" onChange={this.handleChange} placeholder="Opis projektu"></textarea>
                        </div>
                    </div>
                </form>
                <h2>Gallery</h2>
                <form className="form-container" onSubmit={this.handleSubmitGallery}>
                    <div className="form-row">
                        <div className="form-label">
                            <label htmlFor="imgTitle">Opis zdjęcia</label>
                        </div>
                        <div className="form-field">
                            <input type="text" id="imgAlt" name="imgAlt" value={this.state.imgAlt} onChange={this.handleChange} placeholder="Opis zdjęcia" />
                        </div>
                        <div className="form-label">
                            <label htmlFor="image">Zdjęcia</label>
                        </div>
                        <div className="form-field">
                            <input type="file" name="image" id="image" accept="image/*" ref={this.fileInput} />
                        </div>
                    </div>
                    <div className="form-row form-row--column">
                        <progress value={this.state.progress} max="100" />
                        <button className="form-btn" type="sumbit">Dodaj zdjęcie</button>
                    </div>
                </form>
                <div className="form__gallery">
                    {addImages}
                </div>
                <button className="form-btn form-btn--big" onClick={this.addProject}>Dodaj projekt</button>

            </div >
        );
    }
}

export default AdminAddProjects;