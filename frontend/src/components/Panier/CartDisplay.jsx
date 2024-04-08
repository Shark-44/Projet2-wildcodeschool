import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/StoreContext";

import imgFullCart from "../../assets/img/02_Images/Logo/panier.png";
import imgCartDisplay from "../../assets/img/03_Tablettes/planche_1.png";

import "./CartDisplay.scss";

function CartDisplay() {
  const { cartItems, getItemAmount } = useContext(ShopContext);
  const [itemAmount, setItemAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setItemAmount(getItemAmount());
  }, [cartItems]);

  const handleClick = () => {
    navigate("../cart");
  };

  return (
    <div className="navBarCartBttn">
      <img className="imgCartDisplay" src={imgCartDisplay} alt="shoppingCart" />
      <button type="button" className="buttonCart" onClick={handleClick}>
        {itemAmount > 0 ? (
          <div className="fullCartBttn">
            <span className="cartTotalBttn">{itemAmount} Articles</span>
            <img className="imgFullCart" src={imgFullCart} alt="shoppingcart" />
          </div>
        ) : (
          <div className="emptyCartBttn">
            <p className="emptyCartMessage">Panier</p>
          </div>
        )}
      </button>
    </div>
  );
}

export default CartDisplay;
