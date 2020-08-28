import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCjlpeXQ52uqQrtLgU-tpB5foOYTGy5HuA",
  authDomain: "whats-app-clone-8e7e3.firebaseapp.com",
  databaseURL: "https://whats-app-clone-8e7e3.firebaseio.com",
  projectId: "whats-app-clone-8e7e3",
  storageBucket: "whats-app-clone-8e7e3.appspot.com",
  messagingSenderId: "820644638402",
  appId: "1:820644638402:web:7ef96bc31680a3a9e0955b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

