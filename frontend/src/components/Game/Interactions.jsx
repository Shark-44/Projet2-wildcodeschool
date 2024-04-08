// HOOKS
import { useState, useEffect, useRef, useContext } from "react";
// LIBS
// import styled from "styled-components";
import axios from "axios";
// CONTEXT
import GameContext from "../../services/GameContext";
import GeneralContext from "../../services/General_context";
// COMPONENTS
import GameNav from "./Menu-Pause/GameNav";
import Monkey from "./Monkey";
import MenuPause from "./Menu-Pause/menuPause";
import Piece from "./Piece";
import Obstacle from "./Obstacle";
import CoinCounter from "./CoinCounter/CoinCounter";
import FinPartie from "./popup_finPartie";
import UserLevel from "./UserLevel/UserLevel";
// SCSS
import "./Interactions.scss";
// SOUNDS
import forestSound from "../../assets/sounds/forestBirds.ogg";
import sonWarning from "../../assets/sounds/beep-warning.mp3";

function Interact() {
  /* ==========================  STATES  ===================================== */
  // API
  const [GameConfig, setGameConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // GAME CONTROLS
  const [launcher, setLauncher] = useState(true);
  const [gameStarted, setGameStarted] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameRestart, setGameRestart] = useState(false);
  console.info(gameRestart);
  const [username, setUsername] = useState("");
  const [guest, setGuest] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState(0);

  // STATES MONKEY
  const [isRunningRight, setIsRunningRight] = useState(0);
  const [isMoving, setIsMoving] = useState(0);
  const [CountCoin, setCoinTaked] = useState(0);
  const [CountObstacle, setCountObstacle] = useState(0);

  // SCORE & LENGTH
  const [score, setScore] = useState(100);
  const [actualLife, setActuaLife] = useState(3);

  // REF
  const MonkeyCoordRef = useRef(null);
  const MonkeyJumping = useRef(null);
  const coinCaught = useRef(false);

  // GENERAL CONTEXT
  const { setMushWallet } = useContext(GeneralContext);

  /* ================================ FUNCTIONS ================================ */

  // SOUNDS
  const soundForestRef = useRef(new Audio(forestSound));

  const playForest = (bool) => {
    const soundForest = soundForestRef.current;
    if (bool) {
      soundForest.loop = true;
      soundForest.volume = 0.5;
      soundForest.currentTime = 0;
      soundForest.play();
    } else {
      soundForest.pause();
      soundForest.currentTime = 0;
      soundForest.load(); // Charger à nouveau le son pour le remettre à zéro
    }
  };

  /* ================================= TRIGGERS ================================ */

  // SOUNDS
  useEffect(() => {
    if (!isLoading) {
      if (soundActive && gameStarted) {
        playForest(true);
      } else {
        playForest(false);
      }
    }
  }, [soundActive, gameStarted, isLoading]);

  // DATA FETCH FROM API
  useEffect(() => {
    fetch("../../../src/services/config_game.json")
      .then((reponse) => reponse.json())
      .then((data) => {
        setGameConfig(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    setUsername(localStorage.getItem("pseudo"));
    setGuest(JSON.parse(localStorage.getItem("guest")));
  }, []);

  // CHARGEMENT JEU
  useEffect(() => {
    setLauncher(true);
    // console.info(launcher);
    // console.log("passe par là");
  }, []);

  useEffect(() => {
    // console.log(`reinit, gameStared : ${gameStarted}`);
    if (gameStarted) {
      setActuaLife(1);
      setCoinTaked(0);
      setScore(0);
      setCountObstacle(0);
      setGameEnded(false);
      setGameRestart(false);
      setGameEnded(false);
      // console.log("et repasse par là");
    }
  }, [gameStarted, launcher]);

  // GESTION SCORE
  useEffect(() => {
    if (CountCoin) {
      setScore(CountCoin);
    }
  }, [CountCoin]);

  /* SAUVEGARDE DB MUSHS SCORE */
  useEffect(() => {
    const LocalIsGuest = JSON.parse(localStorage.getItem("guest"));
    const LocalIsLogged = JSON.parse(localStorage.getItem("logged"));
    // console.log(`LocalIsGuest : ${LocalIsGuest}`);
    if (!LocalIsGuest && LocalIsLogged && gameEnded) {
      axios
        .post("http://localhost:8000/saveScore", {
          id: localStorage.getItem("id"),
          score: CountCoin,
          username: localStorage.getItem("pseudo"),
          level: selectedLevel,
        })
        .then((response) => {
          if (response && response.status === 200) {
            // console.log("score sauvegardé");
            // console.log(response);
            const updatedMushs = response.data.mushs;
            setMushWallet(updatedMushs);
            localStorage.setItem("mushs", JSON.stringify(updatedMushs));
          }
        });
    } else {
      // console.log("vasy log toi fais pas le rat");
    }
  }, [gameEnded]);

  // GESTION VIE
  useEffect(() => {
    if (CountObstacle) {
      setActuaLife((prev) => {
        if (prev - 1 === 0) {
          setGameEnded(true);
          // console.log("fin de la partie");
          return 0;
        }
        if (prev - 1 <= 1 && soundActive) {
          new Audio(sonWarning).play();
        }
        return prev - 1;
      });
    }
  }, [CountObstacle]);

  /* ================================= RENDER =================================== */

  if (isLoading) {
    return <p> LOADING API </p>;
  }

  if (!isLoading) {
    // CONFIG (Si GameConfig fetch)
    const { monkey, pieces, obstacles } = GameConfig;

    return (
      <>
        {/* -------------- NAV -----------------*/}
        {/* NAVBAR JEU */}
        {!launcher && !isPaused ? (
          <div className="wrap-GameNav">
            <GameNav
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              actualLife={actualLife}
              setActuaLife={setActuaLife}
              setSoundActive={setSoundActive}
              soundActive={soundActive}
            />
          </div>
        ) : null}

        {/* -------------- PAUSE -----------------*/}
        {isPaused ? (
          <div className="menuPauseFS">
            <div className="menuPauseOn">
              <MenuPause
                setIsPaused={setIsPaused}
                setGameRestart={setGameRestart}
              />
            </div>
          </div>
        ) : null}

        {/* ---------- SELECT LEVEL ---------------- */}
        {launcher ? (
          <div className="menuPauseFS">
            <div className="menuSelectScore">
              <UserLevel
                guest={guest}
                username={username}
                setSelectedLevel={setSelectedLevel}
                setGameStarted={setGameStarted}
                selectedLevel={selectedLevel}
                setLauncher={setLauncher}
              />
            </div>
          </div>
        ) : null}

        {/* -------------- SCORE -----------------*/}

        {/* -------------- GAME -----------------*/}
        <div className="Game-content">
          {gameEnded ? (
            <div className="wrap-finPartie">
              <FinPartie
                score={score}
                setLauncher={setLauncher}
                setGameEnded={setGameEnded}
                soundActive={soundActive}
              />
            </div>
          ) : null}

          <GameContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
              isRunningRight,
              setIsRunningRight,
              isMoving,
              setIsMoving,
              MonkeyCoordRef,
              MonkeyJumping,
              coinCaught,
              gameStarted,
              isPaused,
              setCoinTaked,
              setCountObstacle,
              soundActive,
              gameEnded,
            }}
          >
            {gameEnded || isPaused || !gameStarted || launcher ? null : (
              <>
                <div className="wrap-CoinCounter">
                  <CoinCounter score={score} />
                </div>

                <Piece MONKEY_SIZE={monkey.size} CONFIG_PIECE={pieces} />

                <Monkey CONFIG_MONKEY={monkey} />

                <Obstacle
                  CONFIG_PIECES={pieces}
                  MONKEY_SIZE={monkey.size}
                  CONFIG_OBSTACLES={obstacles}
                />
              </>
            )}
          </GameContext.Provider>
        </div>
      </>
    );
  }
}

export default Interact;
