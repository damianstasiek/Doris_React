import React, { Component } from 'react';
import '../styles/AdminPage.css'
import * as firebase from 'firebase'

class AdminPage extends Component {
    refProjects = firebase.firestore().collection('projects')
    state = {
        images: [],
        title: '',
        description: '',
        gallery: [],
        progress: 0
    }
    fileInput = React.createRef();
    imgAlias = React.createRef();

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
                        console.log(url);
                        gallery.image = url;
                        gallery.title = image.alias
                        this.setState({ gallery: [...this.state.gallery, gallery] })
                    })
                });
            this.setState({
                images: [],
                progress: 0
            })
        })
    }
    handleSubmitGallery = (event) => {
        event.preventDefault();
        const images = {
            adres: this.fileInput.current.files[0],
            alias: this.imgAlias.current.value
        }
        this.setState({ images: [...this.state.images, images] })
        console.log(images)
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
                gallery: []
            });
            console.log("dodałem")
            // this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding doucment: ", error)
            });
    }

    render() {
        console.log(this.state.images)
        console.log(this.state.gallery)
        const addImages = this.state.gallery.map(img => <div key={img.title} className="project__gallery"><img src={img.image} className="img-responsive" alt={img.title} /> </div>
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
                    <button>Dodaj</button>
                </form>
                <form className="form-row" onSubmit={this.handleSubmitGallery}>
                    <div className="form-label">
                        <label htmlFor="imgTitle">Tytuł obrazka</label>
                    </div>
                    <div className="form-field">
                        <input type="text" id="imgTitle" name="imgTitle" ref={this.imgAlias} placeholder="Opis obrazka" />
                    </div>
                    <div className="form-label">
                        <label htmlFor="image">Zdjęcia</label>
                    </div>
                    <div className="form-field">
                        <input type="file" name="image" id="image" accept="image/*" ref={this.fileInput} />
                    </div>
                    <progress value={this.state.progress} max="100" />
                    <button type="sumbit">Dodaj foto</button>
                </form>
                <button onClick={this.handleAddGallery}>Dodaj projekt</button>
                <button onClick={this.addProject}>Dodaj ostatecznie projekt</button>

                {addImages}
            </div >
        );
    }
}

export default AdminPage;