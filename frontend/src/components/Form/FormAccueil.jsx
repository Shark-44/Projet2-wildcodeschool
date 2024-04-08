import "./FormAccueil.scss";
import bpPlay from "../../assets/img/01_Boutons/play.png";
import imgBg from "../../assets/img/03_Tablettes/bg_4.png";

function FormAccueil({ onClick }) {
  return (
    <div className="containerAccueil">
      <img
        id="logo"
        src="src/assets/img/02_Images/Logo/Logo.png"
        alt="Titre site"
      />
      <div className="panneauWood">
        <img id="img-bg" src={imgBg} alt="background" />
        <div className="panneauWood-content">
          <div className="panneauWood-title">
            <span>Acceder au jeu</span>
          </div>
          <div className="panneauWood-link">
            <button className="btnLog" type="button" onClick={onClick}>
              <img id="boutonPlay" src={bpPlay} alt="Play" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAccueil;
