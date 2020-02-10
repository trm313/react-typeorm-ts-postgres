import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

const PageLayout = props => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-100">
      <NavBar />
      <section className="flex-grow flex flex-col">{props.children}</section>

      <Footer />
    </div>
  );
};

export default PageLayout;
