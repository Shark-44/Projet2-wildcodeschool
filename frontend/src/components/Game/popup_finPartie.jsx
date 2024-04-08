import { useEffect } from "react";
import "./popup_finPartie.scss";

import imgBg from "../../assets/img/03_Tablettes/table.png";
import imgEtoiles from "../../assets/img/02_Images/Stars/3stars.png";
import ButtonMain from "../NavbarHeader/ButtonMain";
import sonVictoire from "../../assets/sounds/yay-6120.mp3";

function FinPartie({ score, setLauncher, soundActive, setGameEnded }) {
  const handleRestart = () => {
    // console.log("appel launcher");
    setGameEnded(false);
    setLauncher(true);
  };

  const isGuest = JSON.parse(localStorage.getItem("guest"));
  const mushs = JSON.parse(localStorage.getItem("mushs"));

  useEffect(() => {
    if (soundActive) {
      new Audio(sonVictoire).play();
    }
  }, []);

  return (
    <div className="wrap-popFinPartie">
      <div className="finPartie-bg">
        <img id="bg" src={imgBg} alt="" />
        <div className="finPartie-content">
          <div className="finPartie-row1 row"> </div>
          <div className="finPartie-row2 row">
            <div className="imgStars">
              <img id="stars" src={imgEtoiles} alt="étoiles" />
            </div>
          </div>

          <div className="finPartie-row3 row">
            <span> + {score} mushs ! </span>
            {isGuest ? (
              <span className="text-Guest">
                {" "}
                You should play as logged to take profits !{" "}
              </span>
            ) : (
              <span className="text-Guest"> Now you have {mushs} ! </span>
            )}
          </div>

          <div className="finPartie-row4 row">
            <ButtonMain title="Boutique" chemin="/Store" />
            <ButtonMain
              type="button"
              title="Restart"
              chemin="/Game"
              onClick={handleRestart}
            />
            <ButtonMain title="Scores" chemin="/Scores" />
          </div>

          <div className="finPartie-row5 row"> </div>
        </div>
      </div>
    </div>
  );
}

export default FinPartie;
