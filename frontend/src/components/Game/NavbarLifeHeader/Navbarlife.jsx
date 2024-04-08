import React, { useEffect, useState } from "react";
import "./Navbarlife.scss";
import heart from "../../../assets/img/05_Life/heart.png";

function Navbarlife({ actualLife }) {
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const tab = [];
    for (let i = 0; i < actualLife; i += 1) {
      tab.push(<img src={heart} alt="coeur" key={i} />);
    }

    setHearts(tab);
  }, [actualLife]);

  return <div className="wrap-life">{hearts}</div>;
}

export default Navbarlife;
