import React, { useState } from "react";

import "./StoreFilter.scss";

function StoreFilter({ productsTmp, setProducts }) {
  const shipping = productsTmp.map((x) => x.shipping);
  const uniqueShipping = Array.from(new Set(shipping));

  const [ship, setShip] = useState("");

  const handleChangeShip = (e) => {
    setShip(e.target.value);
  };

  const handleClickButton = () => {
    const filteredProducts = [...productsTmp];

    if (ship !== "all") {
      const filteredList = filteredProducts.filter(
        (item) => item.shipping === ship
      );
      setProducts(filteredList);
    } else {
      setProducts(productsTmp);
    }
  };
  return (
    <div className="filterButton">
      <div className="filterCategory">
        <select className="selectShipFilter" onChange={handleChangeShip}>
          <option value="" disabled selected>
            Livraison
          </option>
          <option value="all">Toutes Options</option>
          {uniqueShipping.map((shipping) => (
            <option value={shipping} key={shipping}>
              {shipping}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleClickButton}>
          Confirmer
        </button>
      </div>
    </div>
  );
}

export default StoreFilter;
