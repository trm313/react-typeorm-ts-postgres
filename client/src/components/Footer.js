import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 w-screen py-8 px-6 flex justify-between">
      <h6>NoPostgrets</h6>
      <p>Hubbub Studios © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
