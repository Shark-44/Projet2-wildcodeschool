import { Link } from "react-router-dom";
import bpPlay from "../assets/img/tutoriel/retour.png";
import "./Tutoriel.scss";

function Tutoriel() {
  return (
    <div className="wrap-tutoriel">
      <div className="Grid">
        <div className="SousGrid">
          <img
            src="../src/assets/img/tutoriel/GORILLA_StandBy.png"
            alt="attaque_singe"
          />
          <img src="../src/assets/img/tutoriel/space.png" alt="barre_espace" />
          <span className="panelinfo">Attaquer</span>
        </div>
        <div className="SousGrid">
          <img src="../src/assets/img/tutoriel/saut.png" alt="saut" />
          <img src="../src/assets/img/tutoriel/BPhaut.png" alt="flechehaut" />
          <span className="panelinfo">Sauter</span>
        </div>
        <div className="SousGrid">
          <img src="../src/assets/img/tutoriel/glisser.png" alt="glisser" />
          <img src="../src/assets/img/tutoriel/BPbas.png" alt="flechebas" />
          <span className="panelinfo">Glisser</span>
        </div>
      </div>
      <div className="wrap-bouton">
        <div className="butonreturn">
          <Link to="/">
            <img id="butonreturn2" src={bpPlay} alt="Retour" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tutoriel;
