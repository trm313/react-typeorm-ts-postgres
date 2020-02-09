import React from "react";

import logo from "../../logo.svg";
import TestComponent from "../TestComponent";

const Landing = () => {
  return (
    <header className="App-header">
      <TestComponent />
      <img src={logo} className="App-logo" alt="logo" />
      <p className="bg-red-600">
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
};

export default Landing;
