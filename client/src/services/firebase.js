import firebase from "firebase";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyDK6cPu617xYdEHZCVHpVlzjS1RKOqh9So",
  authDomain: "nopostgrets.firebaseapp.com"
  // ...
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;
