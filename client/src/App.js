import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import "./App.css";

import { auth, listenToFirebaseAuth } from "./services/firebase";

import { signUserIn, signUserOut } from "./reducers/userReducer";

const App = ({ signUserIn, signUserOut }) => {
  const user = useSelector(store => store.user);

  useEffect(() => {
    listenToFirebaseAuth(signUserIn, signUserOut);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            path="/dashboard"
            user={user}
            component={Dashboard}
            redirectTo="/"
          />
          <Route exact path="/logout" component={Logout} />
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

/* Routes dependent on Props */
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ user, component, redirectTo, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => {
      console.log("PrivateRoute", user);
      return user && user.signedIn ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: routeProps.location }
          }}
        />
      );
    }}
  />
);
