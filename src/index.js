import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './layouts/App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

var config = {
    apiKey: "AIzaSyCfndHOU1V7ha3IPbL7Bx3gtERjStG038w",
    authDomain: "dorisreact-867a5.firebaseapp.com",
    databaseURL: "https://dorisreact-867a5.firebaseio.com",
    projectId: "dorisreact-867a5",
    storageBucket: "dorisreact-867a5.appspot.com",
    messagingSenderId: "808201990497"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
