import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCfndHOU1V7ha3IPbL7Bx3gtERjStG038w",
    authDomain: "dorisreact-867a5.firebaseapp.com",
    databaseURL: "https://dorisreact-867a5.firebaseio.com",
    projectId: "dorisreact-867a5",
    storageBucket: "dorisreact-867a5.appspot.com",
    messagingSenderId: "808201990497"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;