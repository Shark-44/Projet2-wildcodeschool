import "./ButtonBurger.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import navIcone from "../../assets/img/01_Boutons/icone-singe.png";
import LogoutButton from "./LogoutButton";

function ButtonBurger() {
  const [showLinks, setShowLinks] = useState(false);
  const handleHideLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <section className="globalNav">
      <div className="StylButtonBurger">
        <button type="button" onClick={handleShowLinks}>
          <img src={navIcone} alt="navIcone" />
        </button>
      </div>
      <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
        <ul className="navbar__links" onMouseLeave={handleHideLinks}>
          <li className="navbar__item">
            <Link
              to="/tutoriel"
              className="navbar__link"
              onClick={handleHideLinks}
            >
              Tutoriel
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/scores"
              className="navbar__link"
              onClick={handleHideLinks}
            >
              Score
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/team" className="navbar__link" onClick={handleHideLinks}>
              Team
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/profil"
              className="navbar__link"
              onClick={handleHideLinks}
            >
              Profil
            </Link>
          </li>
          <li className="navbar__item-2">
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default ButtonBurger;
