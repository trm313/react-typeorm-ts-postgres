import React, { useState, useEffect } from "react";
import axios from "axios";

let styles = {
  p: "flex items-center uppercase text-lg",
  div: "bg-white shadow p-4 text-gray-600 rounded-lg"
};

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

  if (data && data === "ERROR") styles.p += " text-red-500";
  if (data && data !== "ERROR") styles.p += " text-green-600";

  return (
    <div className={styles.div}>
      {!data && (
        <p className={styles.p}>
          <i className="lni-spinner-arrow mr-2 spin-inf" />
          Testing data fetch
        </p>
      )}
      {data === "ERROR" && (
        <p className={styles.p}>
          <i className="lni-warning mr-2" />
          Error fetching data
        </p>
      )}
      {data && data !== "ERROR" && (
        <p className={styles.p}>
          <i className="lni-check-mark-circle mr-2" />
          Data fetching succeeded
        </p>
      )}
    </div>
  );
};

export default TestComponent;
