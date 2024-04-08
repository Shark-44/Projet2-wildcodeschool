// REACT LIBS
import { useState, useContext, useEffect } from "react";
// COMPONENTS
import Navbarlife from "../NavbarLifeHeader/Navbarlife";
import pauseButton from "../../../assets/img/01_Boutons/pauseGame.png";
// SOUNDS
import musicOn from "../../../assets/img/01_Boutons/musicOn.png";
import musicOff from "../../../assets/img/01_Boutons/musicOff.png";
// SCSS
import "./GameNav.scss";
// IMG
import mushCart from "../../../assets/img/02_Images/Mushrooms/mushroom-44.svg";
// CONTEXTS
import GeneralContext from "../../../services/General_context";

function GameNav({
  isPaused,
  setIsPaused,
  actualLife,
  setSoundActive,
  soundActive,
}) {
  const { mushWallet } = useContext(GeneralContext);
  const [imgSound, setImgSound] = useState(musicOn);

  const togglePauseMenu = () => {
    setIsPaused(!isPaused);
  };

  const toggleMusicActive = () => {
    setSoundActive(!soundActive);
    setImgSound(soundActive ? musicOff : musicOn);
  };

  useEffect(() => {
    // console.log(mushWallet);
  }, [mushWallet]);

  return (
    <div className="Game-nav">
      {/* ELEM GAUCHE (VIE) */}
      <Navbarlife actualLife={actualLife} />
      {/* ELEM GAUCHE (VIE) */}
      <div className="breakWrapper">
        <div className="wrap-mushs">
          <span> {mushWallet}</span>
          <div className="wrap-img">
            <img src={mushCart} alt="mushCart" />
          </div>
        </div>
        <button id="breakButton" type="button" onClick={togglePauseMenu}>
          <img src={pauseButton} alt="Bouton Pause" />
        </button>
        <button id="soundActive" type="button" onClick={toggleMusicActive}>
          <img src={imgSound} alt="Bouton Pause" />
        </button>
      </div>
    </div>

    // {isPaused ? gameStarted === 1 : null}
  );
}

export default GameNav;
