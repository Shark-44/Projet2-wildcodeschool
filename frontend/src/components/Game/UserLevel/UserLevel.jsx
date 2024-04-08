import React, { useState } from "react";
import "./UserLevel.scss";
import { useNavigate } from "react-router-dom";

import PlayButton from "../../../assets/img/01_Boutons/play.png";

function UserLevel({
  username,
  setSelectedLevel,
  selectedLevel,
  setGameStarted,
  guest,
  setLauncher,
}) {
  const [errorSaisie, setErrorSaisie] = useState(false);
  const nav = useNavigate();

  const handleLevel = (level) => {
    switch (level) {
      case "easy":
        setSelectedLevel(0);
        break;

      case "medium":
        setSelectedLevel(1);
        break;

      case "hard":
        setSelectedLevel(2);
        break;

      default:
        break;
    }
  };

  const handleAccueil = () => {
    nav("/");
  };

  const handleStart = () => {
    if (selectedLevel !== undefined) {
      setGameStarted(true);
      setLauncher(false);
      // console.log("Game start launch");
    } else {
      setErrorSaisie(true);
      setTimeout(() => {
        setErrorSaisie(false);
      }, 1000);
    }
  };

  return (
    <div className="wrapContainer-UserLevel">
      <div className="InsideWrapUserLevel">
        <button type="button" id="btn-back" onClick={handleAccueil}>
          {" "}
        </button>
        <div className="input-UserLevel">
          <span className="pseudo-title">Pseudo</span>
          <span className="pseudo-name">
            {" "}
            {username} {guest && "(guest)"}
          </span>
          <span className="level-title">Level</span>
        </div>
        <div
          className={`Wrap-buttonLevel-UserLevel ${
            errorSaisie ? "error-level" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => handleLevel("easy")}
            className={` buttonUserLevel ${
              selectedLevel === 0 ? "active" : ""
            }`}
          >
            Facile
          </button>
          <button
            type="button"
            onClick={() => handleLevel("medium")}
            className={`buttonUserLevel ${selectedLevel === 1 ? "active" : ""}`}
          >
            Moyen
          </button>
          <button
            type="button"
            onClick={() => handleLevel("hard")}
            className={`buttonUserLevel ${selectedLevel === 2 ? "active" : ""}`}
          >
            Difficile
          </button>
        </div>
        <div className="buttonPlay-UserLevel">
          <button className="btnLog" type="button" onClick={handleStart}>
            <img id="btn-StartGame" src={PlayButton} alt="Play" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLevel;
