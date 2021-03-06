import firebase from 'firebase/app'
import 'firebase/auth';

import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config)

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();

// export const storage = firebase.storage();

// export default firebase
const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const storage = firebase.storage();

export {
    googleProvider, auth, storage, firebase as default
}

