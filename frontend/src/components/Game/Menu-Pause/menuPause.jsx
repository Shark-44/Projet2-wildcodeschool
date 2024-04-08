import React from "react";
import "./menuPause.scss";

import ButtonGen from "./buttonGen";

import bodyPause from "../../../assets/img/01_Boutons/bodyPause.png";
import tablePause from "../../../assets/img/03_Tablettes/tableauPause.png";
import restart from "../../../assets/img/01_Boutons/restart.png";
// import settingPause from "../../../assets/img/01_Boutons/settingPause.png";
import closePause from "../../../assets/img/01_Boutons/closePause.png";

function MenuPause({ setIsPaused, setGameRestart }) {
  const handleBack = () => {
    setIsPaused(false);
    // console.log("pause false");
  };

  const handleRestart = () => {
    setIsPaused(false);
    setGameRestart(true);
  };

  return (
    <div className="mainContainer">
      <div className="pauseContainer">
        <div className="wrapImg">
          <img id="bodyPause" src={bodyPause} alt="Feuille Pause" />
        </div>
        <div className="wrapTable">
          <img id="tablePause" src={tablePause} alt="Tableau Pause" />
          <div className="buttonWrapper">
            <ButtonGen
              img={restart}
              alt="Image restart"
              onClick={handleRestart}
            />
            {/* <ButtonGen
              chemin="/Tutoriel"
              img={settingPause}
              alt="Image pause"
              onClick={handleTuto}
            /> */}
            <ButtonGen
              img={closePause}
              alt="Image close"
              onClick={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPause;
