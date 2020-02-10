import React from "react";

import logo from "../../logo.svg";
import TestComponent from "../TestComponent";
import PageLayout from "../PageLayout";

const Landing = () => {
  return (
    <PageLayout>
      <header className="flex-grow bg-gray-800 flex flex-col items-center justify-center">
        <TestComponent />
        <img src={logo} className="App-logo" alt="logo" />
        <p className="bg-red-600 text-3xl text-white">
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
    </PageLayout>
  );
};

export default Landing;
