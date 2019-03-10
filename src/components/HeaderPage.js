import React, { Component } from 'react';
import logo from '../img/dorisLogo.png'
import { NavLink } from 'react-router-dom'
import * as firebase from 'firebase'

class HeaderPage extends Component {
    state = {
        image: ''
    }

    refProjects = firebase.firestore().collection('projects')

    componentDidMount() {
        if (this.props.class === 'header__projects') {
            const id = this.props.match.params.id
            console.log(id)
            this.refProjects.doc(id).get()
                .then(snapshot => {
                    const project = snapshot.data();
                    const image = project.gallery.filter(item => item.header === true).map(item => item.image)
                    this.setState({ image })
                })
        }

    }

    render() {
        const { image } = this.state
        const bgImage = {
            background: `url(${image}) no-repeat center center fixed`,
            backgroundSize: 'cover',
        }
        console.log(this.state)
        console.log(this.state.image)
        console.log(this.props)
        console.log(this.props.menu)
        console.log(this.props.match.params.id)
        const menu = this.props.menu.map(item => (
            <li key={item.name} className="site-nav__item">
                <NavLink className="site-nav__link" to={item.path}>{item.name}</NavLink>
            </li>
        ))
        return (
            <div className={this.props.class} style={bgImage}>
                <nav className="site-nav">
                    <NavLink className="site-nav__link" to="/"><img className="site-nav__img" src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
                    <ul className="site-nav__list">
                        {menu}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default HeaderPage;

// const HeaderPage = (props) => {
//     console.log(props)
//     console.log(props.menu)
//     console.log(props.match.params.id)
//     const menu = props.menu.map(item => (
//         <li key={item.name} className="site-nav__item">
//             <NavLink className="site-nav__link" to={item.path}>{item.name}</NavLink>
//         </li>
//     ))
//     return (
//         <div className={props.class}>
//             <nav className="site-nav">
//                 <NavLink className="site-nav__link" to="/"><img className="site-nav__img" src={logo} alt="Doris projektowanie wnęrtrz" /></NavLink>
//                 <ul className="site-nav__list">
//                     {menu}
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default HeaderPage;