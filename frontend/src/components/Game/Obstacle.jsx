import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import "./Obstacle.scss";
import GameContext from "../../services/GameContext";
import useWindowDimensions from "../../services/windowSize";
import hit from "../../assets/sounds/hit.mp3";
import imgPierre from "../../assets/img/03_Tablettes/table.png";
import sonNotif from "../../assets/sounds/stop-13692.mp3";

/* =========== DESCRIPTION COMPOSANT OBSTACLE ================ */
/*
/*  Lorsqu'il est appelé -> il set un timer pendant xTemps.  
/*  On récupère la taille de la fenêtre, et on vérifie que 
/*  sa position ne dépasse pas la largeur de la fenêtre.
/*  Si c'est le cas, on interromps le compteur 
/*  Sinon, on incrémente un compteur
/*  Ce compteur ajoute un gap à sa position X */
/*
/*
/* =========================================================== */

function Obstacle({ CONFIG_OBSTACLES, CONFIG_PIECES, MONKEY_SIZE }) {
  const { types } = CONFIG_OBSTACLES;
  const { width: windowWidth } = useWindowDimensions();
  const { speed: CoinSpeed } = CONFIG_PIECES;
  const { isPaused } = useContext(GameContext);
  const { gameStarted } = useContext(GameContext);
  const { isMoving } = useContext(GameContext);
  const { isRunningRight } = useContext(GameContext);
  const { setCountObstacle } = useContext(GameContext);
  const { soundActive } = useContext(GameContext);
  // MONKEY
  const { MonkeyCoordRef } = useContext(GameContext);
  const [selectedObstacle, setSelectedObstacle] = useState(0);
  const { height: monkeyHeight, width: monkeyWidth } = MONKEY_SIZE;
  const [ObstacleCoord, setObstacleCoord] = useState({
    x: 0,
    y: 0,
  });

  // MEMORY
  const [TrigAnim, setTrigAnim] = useState(false);
  const [Anim, setAnim] = useState(false);

  // const [isObstacle, setObstacle] = useState(0);

  // ======================================= FONCTIONS =============================================== */

  // SOUNDS

  const playHit = () => {
    const audioObstacle = new Audio(hit);
    audioObstacle.volume = 0.9;
    audioObstacle.play();
  };

  // RANDOM TIMER
  const calculRandomTimer = () => {
    return Math.floor(Math.random() * 30) + 30;
  };

  // RANDOM OBSTACLE
  const randomObstacle = () => {
    return Math.floor(Math.random() * types.length);
  };

  // UPDATE OVERLAP
  const updateOverlap = (coord) => {
    const MonkeyX = MonkeyCoordRef.current.x;
    const MonkeyY = MonkeyCoordRef.current.y;
    // console.log("monkey X : " + MonkeyX + " monkey Y " + MonkeyY);
    // console.log("obstacle X : " + coord.x + " obstacle Y " + coord.y);
    // Calculs positions chevauchement
    const rangeX = MonkeyX <= coord.x && MonkeyX + monkeyWidth > coord.x;
    // console.log("rangeX : " + rangeX);
    const rangeY =
      MonkeyY + monkeyHeight >= coord.y &&
      MonkeyY <= coord.y + types[selectedObstacle].size.height;
    // console.log("rangeY : " + rangeY);

    // Si chevauchement

    if (rangeX && rangeY) {
      /* ~~~~~~~~~~~~~~~~~~~~~~~~~~   DEBUG    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
      // console.log(" ******************************************************");
      // console.log("chevaucehe obstacle ! ");
      // console.log(
      //   "monkey X : " +
      //     MonkeyX +
      //     " monkey Y " +
      //     MonkeyY +
      //     "monkey width: " +
      //     monkeyWidth +
      //     "monkeyHeight : " +
      //     monkeyHeight
      // );
      // console.log(
      //   "obstacle X : " +
      //     coord.x +
      //     " obstacle Y " +
      //     coord.y +
      //     "obstacle width : " +
      //     types[selectedObstacle].size.width +
      //     " obstacle height : " +
      //     types[selectedObstacle].size.height
      // );
      // console.log("rangeX : " + rangeX);
      // // console.log("rangeY : " + rangeY);
      // console.log(" ******************************************************");
      setAnim(false);
      if (soundActive) {
        playHit();
      }
      setObstacleCoord({ x: 0, y: 0 });
      setCountObstacle(
        (prevScore) => prevScore - types[selectedObstacle].damage
      );
    }
  };

  /* ======================================  TRIGGERS ===================================== */

  // TRIGGER ANIMATION
  useEffect(() => {
    if (!Anim) {
      // setGameStarted(false);
      const randomDuration = calculRandomTimer();
      setSelectedObstacle(randomObstacle());

      const timer = setTimeout(() => setAnim(true), randomDuration * 100);
      if (soundActive) {
        new Audio(sonNotif).play();
      }
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [TrigAnim, Anim]);

  // DECLENCHEMENT ANIMATION
  useEffect(() => {
    if (gameStarted && !isPaused) {
      setTrigAnim(true);
    }

    // JEU EN PAUSE
    if (gameStarted && isPaused) {
      setTrigAnim(false);
    }
  }, [gameStarted, isPaused]);

  useEffect(() => {
    updateOverlap(ObstacleCoord);
  }, [MonkeyCoordRef, ObstacleCoord]);

  // ANIMATION
  useEffect(() => {
    let vitesseObstacle;

    if (Anim) {
      vitesseObstacle = setInterval(() => {
        setObstacleCoord((prevPos) => {
          let newPos;
          // OBSTACLE MOVIBLE
          if (types[selectedObstacle].moving) {
            newPos = isRunningRight
              ? {
                  ...prevPos,
                  x:
                    prevPos.x +
                    CoinSpeed.dist +
                    types[selectedObstacle].speed.dist,
                  y: prevPos.y,
                }
              : {
                  ...prevPos,
                  x: prevPos.x + types[selectedObstacle].speed.dist,
                  y: prevPos.y,
                };
            // OBSTACLE STATIC
          } else {
            if (!isRunningRight) {
              clearInterval(vitesseObstacle);
              return prevPos; // Retourner la position actuelle sans modification
            }

            newPos = {
              ...prevPos,
              x: prevPos.x + CoinSpeed.dist,
              y: prevPos.y,
            };
          }
          // DETECTION SORTIE FENETRE
          if (newPos.x > windowWidth + types[selectedObstacle].size.width) {
            clearInterval(vitesseObstacle);
            setAnim(false);
            return { x: 0, y: 0 };

            // Sinon on retourne le nouveau gap
          }
          return newPos;
        });
      }, CoinSpeed.duration);
    }

    return () => {
      clearInterval(vitesseObstacle);
    };
  }, [Anim, isMoving, isRunningRight]);

  return (
    <>
      <div className={` ${!Anim ? "infObstacle" : "infoInvisible"}`}>
        <div className="wrap-imgInfo">
          <img id="imgPierre" src={imgPierre} alt="bgInfo" />
          <div className="infos">
            <span>Take care ... </span>
            <img
              id="imgObstacleInfo"
              src={types[selectedObstacle].imgSrc}
              alt=""
            />
            <span> A {types[selectedObstacle].name} is in approach! </span>
          </div>
        </div>
      </div>

      <ObstacleStyle
        width={types[selectedObstacle].size.width}
        height={types[selectedObstacle].size.height}
        posX={ObstacleCoord.x}
        posY={ObstacleCoord.y}
        className="obstacle"
      >
        <img src={types[selectedObstacle].imgSrc} alt="Obstacle" />
      </ObstacleStyle>
    </>
  );
}

export default Obstacle;

/* STYLE */
const ObstacleStyle = styled.div.attrs((props) => ({
  style: {
    width: `${props.width}px`,
    height: `${props.height}px`,
    right: `calc(-${props.width}px + ${props.posX}px)`,
  },
}))`
  // background-color: red;
  position: absolute;
  bottom: 0px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

// const Test = styled.div`
//   position: absolute;
//   top: 20px;
//   margin: 0 auto;
//   height: 50px;
//   width: 300px;
//   background-color: green;
//   display: flex;
//   color: white;
//   font-size: 2rem;
//   justify-content: center;
//   border-radius: 15px;
//   cursor: pointer;
// `;
