import { useEffect, useState } from "react";

import axios from "axios";

import Products from "../components/store/Products";
import Articles from "../components/store/Articles";
import StoreFilter from "../components/store/StoreFilter";
import StoreValide from "../components/store/StoreValide";
import "../components/store/Articles.scss";
import "../components/store/StoreFilter.scss";
import "../components/store/StoreValide.scss";
import "./Store.scss";
import "../components/Panier/CartDisplay.scss";
import GetMushsDispo from "../components/store/GetMushsDispo";

function Store() {
  const [products, setProducts] = useState([]);
  const [productsTmp, setProductsTmp] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4242/storedata").then((res) => {
      setProducts(res.data);
      setProductsTmp(res.data);
    });
  }, []);
  return (
    <div className="storeParent">
      <div className="store">
        <div className="storeDisplay">
          <div className="storeDisplayOptions">
            <div className="mushsDispoSection">
              <GetMushsDispo />
            </div>
            <div className="storeFilterSection">
              <StoreFilter
                Products={Products}
                productsTmp={productsTmp}
                setProducts={setProducts}
                setProductsTmp={setProductsTmp}
              />
            </div>
          </div>
          <div className="storeDisplayResults">
            {products.map((product) => (
              <Articles
                id={product.id}
                product={product}
                image={product.image}
                name={product.name}
                price={product.price}
                key={product.id}
                itemCount={product.quantity}
              />
            ))}
          </div>
          <div className="storeChoiceValidation">
            <StoreValide path="/cart" title="Valider Achats" />
            <div className="storeChoiceButton">
              <div className="buttonStoreValider">
                {/* <p> Valider Achats</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
