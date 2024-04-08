import React from "react";
import "./buttonGen.scss";

function ButtonGen({ img, alt, onClick }) {
  return (
    <div className="menuPause-bp">
      <button type="button" onClick={onClick}>
        <img src={img} alt={alt} />
      </button>
    </div>
  );
}

export default ButtonGen;
