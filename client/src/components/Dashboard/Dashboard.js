import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";

const Dashboard = () => {
  const user = useSelector(store => store.user);
  return (
    <Layout>
      <h1>Dashboard</h1>
      <p>Welcome, {user.data.displayName}</p>
    </Layout>
  );
};

export default Dashboard;
