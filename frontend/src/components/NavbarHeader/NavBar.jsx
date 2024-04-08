import ButtonBurger from "./ButtonBurger";
import ButtonMain from "./ButtonMain";
import CartDisplay from "../Panier/CartDisplay";

import "../Panier/CartDisplay.scss";

import "./NavBar.scss";

function NavBar() {
  return (
    <div className="NavBarGlobal">
      <div className="NavBar-Left">
        <ButtonMain chemin="/" title="Accueil" />
      </div>
      <div className="NavBar-Right">
        <ButtonMain chemin="./store" title="Boutique" />
        <div className="navBarPanierBttn">
          <CartDisplay />
        </div>
        {/* <ButtonMain chemin="./Cart" title="Panier" /> */}
        <ButtonBurger className="btn-burger" />
      </div>
    </div>
  );
}

export default NavBar;
