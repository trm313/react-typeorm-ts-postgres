import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { auth } from "../services/firebase";

const Logout = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    auth.signOut();
    setRedirect(true);
  }, []);

  return <div>{redirect && <Redirect to="/" />}</div>;
};

export default Logout;
