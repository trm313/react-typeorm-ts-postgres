import firebase from "firebase";
import { signUserIn, signUserOut } from "../reducers/userReducer";
import { access } from "fs";
// Configure Firebase.
const config = {
  apiKey: "AIzaSyDK6cPu617xYdEHZCVHpVlzjS1RKOqh9So",
  authDomain: "nopostgrets.firebaseapp.com"
  // ...
};
firebase.initializeApp(config);

export const auth = firebase.auth();

export const listenToFirebaseAuth = (cbSignIn, cbSignOut) => {
  console.log("listenToFirebaseAuth");
  auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(accessToken => {
        let userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          providerData: user.providerData,
          accessToken: accessToken
        };
        cbSignIn(userData);
      });
    } else {
      cbSignOut();
    }
  });
};

export default firebase;
