import React, { createContext, useState, useMemo } from "react";

export const ShopContext = createContext({
  cartItems: {},
  addToCart: () => {},
  updateCartItemCount: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  getItemAmount: () => 0,
  checkout: () => {},
  initStore: () => {},
});

function ShopContextProvider(props) {
  const [cartItems, setCartItems] = useState({});

  const { children } = props;

  const initStore = (itemId, imageItem, nameItem, priceItem) => {
    if (!localStorage.getItem("init")) {
      setCartItems((prev) => {
        const updatedItems = { ...prev };
        updatedItems[itemId] = {
          id: itemId,
          image: imageItem,
          name: nameItem,
          price: priceItem,
          quantity: 0,
        };
        return updatedItems;
      });
      localStorage.setItem("init", true);
    }
  };

  const addToCart = (itemId, imageItem, nameItem, priceItem) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId]) {
        updatedItems[itemId].quantity += 1;
      } else {
        updatedItems[itemId] = {
          id: itemId,
          image: imageItem,
          name: nameItem,
          price: priceItem,
          quantity: 1,
        };
      }
      return updatedItems;
    });
  };

  const removeFromCart = (itemId, imageItem, nameItem, priceItem) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };

      if (updatedItems[itemId]) {
        if (updatedItems[itemId].quantity - 1 > 0) {
          updatedItems[itemId].quantity -= 1;
        } else {
          delete updatedItems[itemId];
        }
      } else {
        updatedItems[itemId] = {
          id: itemId,
          image: imageItem,
          name: nameItem,
          price: priceItem,
          quantity: 0,
        };
      }
      return updatedItems;
    });
  };

  const updateCartItemCount = (
    newAmount,
    itemId,
    imageItem,
    nameItem,
    priceItem
  ) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };

      if (updatedItems[itemId]) {
        updatedItems[itemId].quantity = newAmount;
        if (updatedItems[itemId].quantity < 1) {
          delete updatedItems[itemId];
        }
      } else {
        updatedItems[itemId] = {
          id: itemId,
          image: imageItem,
          name: nameItem,
          price: priceItem,
          quantity: newAmount,
        };
      }
      return updatedItems;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (Object.prototype.hasOwnProperty.call(cartItems, itemId)) {
        const item = cartItems[itemId];
        totalAmount += item.price * item.quantity;
      }
    }
    return totalAmount;
  };

  const getItemAmount = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      if (Object.prototype.hasOwnProperty.call(cartItems, itemId)) {
        const item = cartItems[itemId];
        totalItem += item.quantity;
      }
    }
    return totalItem;
  };

  const checkout = () => {
    setCartItems({});
  };

  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemCount,
      getTotalCartAmount,
      getItemAmount,
      checkout,
      initStore,
    }),
    [cartItems]
  );

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
