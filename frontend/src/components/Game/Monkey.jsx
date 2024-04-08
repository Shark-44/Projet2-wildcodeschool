import styled from "styled-components";

import { useEffect, useState, useRef, useContext } from "react";
import { useKeyboard } from "../../services/keyboard";
import GameContext from "../../services/GameContext";
import useWindowDimensions from "../../services/windowSize";
import soundGrass from "../../assets/sounds/runGrass.wav";

// {CONFIG_MONKEY, WINDOW}
function Monkey({ CONFIG_MONKEY }) {
  // DATAS
  const { size, speed, jump, imgs } = CONFIG_MONKEY;
  const { isKeyTop, isKeyLeft, isKeyRight } = useKeyboard();

  // CONTEXT
  const { setIsRunningRight } = useContext(GameContext);
  const { MonkeyCoordRef } = useContext(GameContext);
  const { setIsMoving } = useContext(GameContext);
  const { isMoving } = useContext(GameContext);
  const { soundActive } = useContext(GameContext);
  const { gameEnded } = useContext(GameContext);

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  // RENDER
  const [MonkeyCoord, setMonkeyCoord] = useState({
    x: windowWidth - size.width,
    y: 0,
  });
  const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [imgSrc, setImgSrc] = useState(imgs.monkeyStatic);
  const [dist, setDist] = useState(0);
  console.info(dist);
  const { MonkeyJumping } = useContext(GameContext);

  // SOUND
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioRef = useRef(null);
  // VARIABLES GLOBALES
  const jumpHeight = 2 * size.height;

  /* SOUNDS */

  // ======================================= FONCTIONS =============================================== */

  // SOUND
  const handleSoundEnded = () => {
    setIsPlayingSound(false);
  };

  const stopSound = () => {
    setIsPlayingSound(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const soundRun = () => {
    setIsPlayingSound(true);
    const audio = new Audio(soundGrass);
    audio.addEventListener("ended", handleSoundEnded);
    audio.volume = 1;
    audioRef.current = audio;
    audio.play();
  };

  // RUNNING ON X AXIS
  const updatePositionX = () => {
    if (isKeyRight) {
      setMonkeyCoord((prevPos) => {
        if (prevPos.x < windowWidth / 2) {
          setDist((prevDist) => prevDist + speed.dist);
          return {
            ...prevPos,
            x: prevPos.x,
            y: prevPos.y,
          };
        }
        return {
          ...prevPos,
          x: prevPos.x - speed.dist,
          y: prevPos.y,
        };
      });
    }

    if (isKeyLeft) {
      setMonkeyCoord((prevPos) => {
        if (prevPos.x === windowWidth - size.width) {
          return {
            ...prevPos,
            x: windowWidth - size.width,
            y: prevPos.y,
          };
        }
        return {
          ...prevPos,
          x: prevPos.x + speed.dist,
          y: prevPos.y,
        };
      });
    }
  };

  if (isKeyRight && MonkeyCoord.x <= windowWidth / 2) {
    setIsRunningRight(true);
  } else {
    setIsRunningRight(false);
  }

  // JUMPING -- FALLING
  const JumpEnd = () => {
    let jumpIntervalDescente = null;
    jumpIntervalDescente = setInterval(() => {
      setMonkeyCoord((prevPos) => {
        if (prevPos.y <= 0) {
          clearInterval(jumpIntervalDescente);
          setIsFalling(false);
          setIsJumping(false);
          return { x: prevPos.x, y: 0 };
        }
        return { x: prevPos.x, y: prevPos.y - jump.dist };
      });
    }, 2);
  };

  // JUMPING -- ASCENDING
  const Jump = () => {
    if (!isJumping && !isFalling) {
      setIsJumping(true);
      let jumpIntervalMontee = null;
      jumpIntervalMontee = setInterval(() => {
        setMonkeyCoord((prevPos) => {
          if (prevPos.y >= jumpHeight) {
            clearInterval(jumpIntervalMontee);
            JumpEnd();
            return { x: prevPos.x, y: prevPos.y };
          }
          return { x: prevPos.x, y: prevPos.y + jump.dist };
        });
      }, 2);
    }
  };

  /* ======================================  TRIGGERS ===================================== */

  /* ! -----  RECUPERATION REF POUR PIECE.JSX ---- !  */
  /*          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~         */

  useEffect(() => {
    MonkeyJumping.current = isJumping;
  }, [isJumping]);

  useEffect(() => {
    MonkeyCoordRef.current = MonkeyCoord;
  }, [MonkeyCoord]);

  useEffect(() => {
    if (isMoving && !isPlayingSound && soundActive) {
      soundRun();
    } else if ((!isMoving && isPlayingSound) || !soundActive || gameEnded) {
      stopSound();
    }
  }, [isMoving, isPlayingSound, soundActive, gameEnded]);

  //   ! -------------------------------------------- !

  useEffect(() => {
    setMonkeyCoord((prev) => ({
      ...prev,
      x: windowWidth - size.width,
      y: prev.y,
    }));
  }, [windowWidth, windowHeight]);

  // IS RUNNING LEFT
  useEffect(() => {
    if (isKeyLeft) {
      setIsRunningRight(false);
    }
  }, [isKeyLeft]);

  // KEYBOARD TOUCHED - X AXIS
  useEffect(() => {
    let interval = null;

    // - UPDATE POSITION
    if (isKeyRight || isKeyLeft) {
      interval = setInterval(updatePositionX, speed.duration);
    } else {
      clearInterval(interval);
    }

    // - GIF MONKEY SELECTORS
    if (isKeyLeft) {
      setImgSrc(imgs.monkeyLeft);
    } else if (isKeyRight) {
      setImgSrc(imgs.monkeyRight);
    } else {
      setImgSrc(imgs.monkeyStatic);
    }

    // - ON COMPONENT UNMOUNTING
    return () => {
      clearInterval(interval);
    };
  }, [isKeyLeft, isKeyRight]);

  // KEYBOARD TOUCHED - Y AXIS
  useEffect(() => {
    if (isKeyTop) {
      Jump();
    }
  }, [isKeyTop]);

  // KEYBOARD - MONKEY MOVING STATE
  useEffect(() => {
    if (isKeyLeft || isKeyRight || isKeyTop || isJumping) {
      setIsMoving(true);
    } else {
      setIsMoving(false);
    }
  }, [isKeyLeft, isKeyRight, isKeyTop, isJumping]);

  //   /* ======================================  JSX  ===================================== */

  return (
    <div>
      <WrapMonkey
        height={size.height}
        width={size.width}
        posY={MonkeyCoord.y}
        posX={MonkeyCoord.x}
      >
        <MonkeyStyle src={imgSrc} alt="caption" />
      </WrapMonkey>
    </div>
  );
}

export default Monkey;

// /* =========================================  STYLE  ===================================== */

// Mettre les props en attributs pour indiquer changements fréquent et ne pas générer de nouvelles classes
const WrapMonkey = styled.div.attrs((props) => ({
  style: {
    bottom: `${props.posY}px`,
    right: `${props.posX}px`,
  },
}))`
  position: absolute;
  // width: 100vw;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const MonkeyStyle = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;
