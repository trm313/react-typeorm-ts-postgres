import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { auth } from "../services/firebase";
import { signUserOut } from "../reducers/userReducer";

let styles = {
  links:
    "w-full md:visible md:block flex-grow md:flex md:items-center md:w-auto",
  link:
    "block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 uppercase hover:shadow rounded-lg py-2 px-4"
};

const NavLink = props => {
  const { to, className = styles.link } = props;
  return (
    <Link to={to} className={className}>
      {props.children}
    </Link>
  );
};

const NavBar = ({ signUserOut }) => {
  const [navOpen, setNavOpen] = useState(false);

  const user = useSelector(store => store.user);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-4 px-6">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          PERN Starter
        </span>
      </Link>
      <a
        className="cursor-pointer py-1 px-2 flex items-center border border-solid border-white rounded text-white shadow hover:bg-white hover:text-teal-500"
        href="https://github.com/trm313/react-typeorm-ts-postgres"
        target="__blank"
      >
        <i className="lni-github-original mr-2" />
        Github
      </a>
      <div className="block md:hidden">
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          styles.links + (navOpen ? " block visible" : " hidden invisible")
        }
      >
        <div className="text-sm md:flex-grow ml-12">
          <NavLink to="#">Docs</NavLink>
          <NavLink to="#">Blog</NavLink>
          {user.signedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
        <div className="ml-12">
          {user.signedIn && <NavLink to="/logout">Logout</NavLink>}
          {!user.signedIn && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapDispatch = { signUserOut };

export default connect(null, mapDispatch)(NavBar);
// export default NavBar;
