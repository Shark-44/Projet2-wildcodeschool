// import Card from "../components/Panier/Card";
import ButtonNumberItems from "../components/Panier/ButtonNumberItems";
import CumulPrice from "../components/Panier/CumulPrice";
import ListItems from "../components/Panier/ListItems";
import MushsDispo from "../components/Panier/MushsDispo";
import MushsDispoEnd from "../components/Panier/MushsDipsoEnd";
import Total from "../components/Panier/Total";
import Validation from "../components/Panier/Validation";

import imgBg from "../assets/img/03_Tablettes/table.png";
import mushbg from "../assets/img/03_Tablettes/mushs.png";
import validbg from "../assets/img/03_Tablettes/validation.png";
import planchebg from "../assets/img/03_Tablettes/planche.png";

import "./Panier.scss";
// import TabPanier from "../components/Panier/TabPanier";

function Panier() {
  return (
    <div className="wrap-panier">
      {/* Image background absolute */}
      <div className="wrap-table">
        <div className="Panier-bg">
          <img src={imgBg} alt="img-bg" />
          {/* Panier relatif */}
          <div className="table">
            <div className="mushDispoStart">
              <img src={mushbg} alt="mush-bg" />
              <MushsDispo />
            </div>
            {/* <div className="tableau">
                <TabPanier />
              </div>  */}
            <div className="card">
              <ListItems />
              <div className="planche">
                <img src={planchebg} alt="planche-bg" />
                <ButtonNumberItems />
              </div>
              <CumulPrice />
            </div>
            <Total />
            <div className="mushDispoEnd">
              <img src={mushbg} alt="mush-bg" />
              <MushsDispoEnd />
            </div>
          </div>
        </div>
        <div className="button-valid">
          <div className="validation">
            <img src={validbg} alt="Valid-bg" />
            <Validation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panier;
