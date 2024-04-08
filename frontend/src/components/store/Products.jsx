import { useEffect, useContext } from "react";
import { ShopContext } from "../../context/StoreContext";

import CartItem from "../Panier/CartItem";

import "./Products.scss";

function Products() {
  const { cartItems } = useContext(ShopContext);

  useEffect(() => {}, []);

  return (
    <div className="itemProducts">
      {Object.values(cartItems).map((object) => (
        <>
          {/* <Articles
            id={object.id}
            name={object.name}
            price={object.price}
            image={object.image}
            shipping={object.shipping}
            key={object.id}
          /> */}
          {/* <StoreFilter
            name={object.name}
            price={object.price}
            image={object.image}
            shipping={object.shipping}
            key={object.id}
          /> */}
          <CartItem
            id={object.id}
            name={object.name}
            price={object.price}
            key={object.id}
          />
        </>
      ))}
    </div>
  );
}

export default Products;
