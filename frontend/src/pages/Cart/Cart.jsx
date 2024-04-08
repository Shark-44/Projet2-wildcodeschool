import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/StoreContext";
import CartItem from "../../components/Panier/CartItem";
import imgBgCartItems from "../../assets/img/03_Tablettes/table.png";

import "./Cart.scss";
import "../../components/Panier/CartItem.scss";

function Cart() {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalCartAmount());
  }, [cartItems]);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cartTitle">
        <p className="cartTitleMain">Votre Liste d'Achats</p>
      </div>

      <div className="wrap-classItems">
        <img src={imgBgCartItems} alt="img-bg" className="cartItems-bg" />
        <div className="wrap-toutItems">
          <div className="cartItems">
            {Object.values(cartItems).map((product) => {
              if (product.id !== 0) {
                return (
                  <CartItem
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    key={product.id}
                    itemCount={product.quantity}
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="totalDisplay">
            <p className="subTotal">Total: {totalAmount} mushs</p>
          </div>
        </div>
      </div>
      <div className="finalizeCartBttns">
        {totalAmount > 0 ? (
          <div className="checkout">
            <button
              type="button"
              className="continueShoppingBttn"
              onClick={() => navigate("../store")}
            >
              Continuer Achats
            </button>
            <button
              type="button"
              className="checkoutBttn"
              onClick={() => navigate("../panier")}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div className="emptyCartTitle">
            <p className="emptyCartMessage">Votre Panier est Vide</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
