import React, { useContext } from "react";
import { ShopContext } from "../../context/StoreContext";
import countHandlerBg from "../../assets/img/03_Tablettes/planche.png";
import "./CartItem.scss";

function CartItem({ id, name, price, itemCount }) {
  const { addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <div className="articleCart">
        <div className="singleArticleCart">
          <div className="itemInfoName">
            <p className="itemName">{name}</p>
          </div>
          <div className="countHandler">
            <img
              src={countHandlerBg}
              alt="countHandlerBg"
              className="countHandlerBg"
            />
            <div className="countHandler-bttn">
              <button
                type="button"
                className="buttonRemoveStore"
                onClick={() => removeFromCart(id)}
              >
                -
              </button>
              <input
                className="cartInputValue"
                value={itemCount}
                onChange={(e) =>
                  updateCartItemCount(Number(e.target.value), id)
                }
              />
              <button
                type="button"
                className="buttonAddStore"
                onClick={() => addToCart(id)}
              >
                +
              </button>
            </div>
          </div>
          <div className="itemInfoPrice">
            <p className="itemPrice">{price} mushs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
