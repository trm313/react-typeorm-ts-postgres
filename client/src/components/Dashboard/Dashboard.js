import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Layout from "./Layout";
import Events from "./Events";

const Dashboard = () => {
  const user = useSelector(store => store.user);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        axios.defaults.headers.common["FIREBASE_AUTH_TOKEN"] =
          user.data.accessToken;
        const result = await axios.get("/api/v1/user");
        setData(result);
      } catch {
        setData("ERROR");
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>
      <p>Welcome, {user.data.displayName}</p>
      <Events />
    </Layout>
  );
};

export default Dashboard;
