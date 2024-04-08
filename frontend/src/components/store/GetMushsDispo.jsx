import React, { useEffect, useState } from "react";

import "./GetMushsDispo.scss";

function GetMushsDispo() {
  const [mushsDispoData, setMushsDispoData] = useState(0);

  useEffect(() => {
    setMushsDispoData(JSON.parse(localStorage.getItem("mushs")));
    // setMushsDispoData(20);
  }, []);

  return (
    <div className="mushsDispoMain">
      <div className="mushsDispoData">
        {mushsDispoData ? (
          <div className="plentyMushs">
            <p>Mushs Dispo: {mushsDispoData}</p>
          </div>
        ) : (
          <div className="noMushs">
            <p>Aucun mushs Dispo</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetMushsDispo;
