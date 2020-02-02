import React, { useState, useEffect } from "react";
import axios from "axios";

const TestComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("/api/v1/search?q=Philadelphia");
        setData(result);
      } catch {
        setData("ERROR");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow p-4 text-gray-600 rounded-lg">
      {!data && <p>Testing data fetch</p>}
      {data === "ERROR" && <p className="text-red-500">Error fetching data</p>}
      {data && data !== "ERROR" && <p>Data fetching succeeded</p>}
    </div>
  );
};

export default TestComponent;
