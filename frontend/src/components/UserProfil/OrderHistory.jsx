import React, { useState, useEffect } from "react";
import axios from "axios";

import "./OrderHistory.scss";

function OrderHistory() {
  const [responseDataOrdery, setResponseDataOrdery] = useState("");
  // const [item] = responseDataOrdery[0];
  useEffect(() => {
    axios
      .get("http://localhost:8000/orderhistory")
      .then((response) => {
        setResponseDataOrdery(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="titleOrderHistory">
      <span>Historique des commandes</span>
      <div className="responseDataHistory">
        {responseDataOrdery && responseDataOrdery.length > 0 && (
          <span id="test">
            {responseDataOrdery[0].item} {responseDataOrdery[0].number}
          </span>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
