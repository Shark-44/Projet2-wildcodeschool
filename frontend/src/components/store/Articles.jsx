import { useContext, useState } from "react";
import { ShopContext } from "../../context/StoreContext";

import imgArtStore from "../../assets/img/02_Images/backgrounds/panneau-store.png";

import "./Articles.scss";

function Articles({ id, image, name, price, itemCount }) {
  const { updateCartItemCount } = useContext(ShopContext);
  const [cartItemAmount] = useState(0);
  const [valInput, setValInput] = useState(0);

  const handleValInput = (e) => {
    setValInput(Number(e.target.value));
  };

  // useEffect(() => {
  //   setCartItemAmount(cartItems[id]);
  // }, [cartItems]);

  return (
    <div className="articleMain">
      <div className="artStoreMain">
        <div className="artImgBackground">
          <img className="imgArtStore" src={imgArtStore} alt="" />
        </div>
        <div className="artCardArticle">
          <div className="artImgDiv">
            <img
              className="artCardImg"
              src={`http://localhost:4242/${image}`}
              alt={name}
            />
          </div>
          <div className="space2">
            <p>"space2"</p>
          </div>
          <div className="artImgName">
            <p>
              {name} - {price} mushs
            </p>
          </div>
          <div className="space3">
            <p>"space3"</p>
          </div>
          <div className="articleAdd">
            <input
              className="articleInputValue"
              value={itemCount}
              onChange={handleValInput}
            />
            <button
              type="button"
              className="buttonAddStore"
              onClick={() =>
                updateCartItemCount(valInput, id, image, name, price)
              }
            >
              Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
          </div>
          <div className="space4">
            <p>"space4"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
