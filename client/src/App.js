import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/Login";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import "./App.css";

import { auth } from "./services/firebase";

import { signUserIn, signUserOut } from "./reducers/userReducer";

const App = ({ signUserIn, signUserOut }) => {
  const user = useSelector(store => store.user);

  useEffect(() => {
    const listenToFirebaseAuth = () => {
      console.log("listenToFirebaseAuth");
      auth.onAuthStateChanged(user => {
        if (user) {
          signUserIn({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            providerData: user.providerData
          });
        } else {
          signUserOut();
        }
      });
    };

    listenToFirebaseAuth();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

// const mapState = state => ({
//   user: state.user
// });
const mapDispatch = { signUserIn, signUserOut };

// export default App;
export default connect(null, mapDispatch)(App);
