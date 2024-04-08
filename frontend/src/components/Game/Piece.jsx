import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import GameContext from "../../services/GameContext";
import useWindowDimensions from "../../services/windowSize";
import munch from "../../assets/sounds/munch.mp3";

import "./Piece.scss";

/* OPTIMISATION : MEMOIZED ?
                  CLE UNIQUE ?
*/

function Piece({ MONKEY_SIZE, CONFIG_PIECE }) {
  // DATAS
  const { size, speed, position, imgs, gap } = CONFIG_PIECE;
  const { width: windowWidth } = useWindowDimensions();
  const monkeyHeight = MONKEY_SIZE.height;
  const monkeyWidth = MONKEY_SIZE.width;

  // CONTEXT
  const { MonkeyCoordRef } = useContext(GameContext);
  const { isRunningRight } = useContext(GameContext);
  const { setCoinTaked } = useContext(GameContext);
  const { coinCaught } = useContext(GameContext);
  const { isMoving } = useContext(GameContext);
  const { soundActive } = useContext(GameContext);
  // const { score } = useContext(GameContext);
  // const { setScore } = useContext(GameContext);
  // RENDER
  const [PiecesCoord, setPiecesCoord] = useState([]);

  // REF
  const pieceId = useRef(0);

  // INIT
  const INIT_Y = position.y;

  const piece = {
    id: 0,
    x: 0,
    y: 0,
    active: false,
  };

  const nbrePieceScreen = Math.floor((windowWidth / 2 - 2 * gap) / size.width);

  // ======================================= FONCTIONS =============================================== */

  // SOUND
  const playMuch = () => {
    const audioMush = new Audio(munch);
    audioMush.volume = 0.6;
    audioMush.play();
  };

  // UPDATE ON EXCEEDING SIZE WINDOW
  const updateCoinSizeWindow = (buffer) => {
    if (buffer.length > 0) {
      if (buffer[0].x > windowWidth) {
        buffer.shift();
      }
    }

    return buffer;
  };

  // UPDATE NEW PIECES
  const updateFromGap = (buffer) => {
    // Si tableau pas pleins, ajoute pièce si gap respecté
    if (buffer.length < nbrePieceScreen) {
      if (buffer[buffer.length - 1].x > gap + size.width) {
        pieceId.current += 1;

        // Random Y pièces
        const randomY = Math.round(Math.random());
        buffer.push({
          ...piece,
          id: `M${pieceId.current}`,
          x: 0,
          y: randomY ? INIT_Y + 2 * size.height : INIT_Y,
        });
        return buffer;
      }
    }
    return buffer;
  };

  // UPDATE OVERLAP
  const updateOverlap = (buffer) => {
    const monkeyChevaucheIndex = buffer.findIndex((piece) => {
      const MonkeyX = MonkeyCoordRef.current.x;
      const MonkeyY = MonkeyCoordRef.current.y;

      // Calculs positions chevauchement
      const rangeX =
        MonkeyX + monkeyWidth >= piece.x && MonkeyX <= piece.x + size.width;
      const rangeY =
        MonkeyY + monkeyHeight >= piece.y && MonkeyY <= piece.y + size.height;

      return rangeX && rangeY;
    });

    // Si chevauchement
    if (monkeyChevaucheIndex !== -1) {
      buffer.splice(monkeyChevaucheIndex, 1);
      // scoreRef.current += 1;
      setCoinTaked((prevScore) => prevScore + 1);
      coinCaught.current = true;
      if (soundActive) {
        playMuch();
      }
      // setScore((prevScore) => prevScore + 1);
      // console.log(score);
    }

    return buffer;
  };

  // UPDATE POSITIONS
  const updateSetPosition = (buffer) => {
    // console.log("update pos : " + buffer.x);
    // MAP ET DECALAGE DE TOUS LES ELEMENTS PRESENTS PAR RAPPORT A GAP
    const updatedBuffPieceWithDist = buffer.map((elem) => ({
      ...elem,
      x: elem.x + speed.dist,
      y: elem.y,
      id: elem.id,
    }));

    return updatedBuffPieceWithDist;
  };

  // UPDATE PIECES
  const updatePieces = () => {
    // Copie du tableau de pièces en cours pour travailler
    const buffStep0 = [...PiecesCoord];
    // DETECT OVERLAP
    let buffStep1 = buffStep0;
    if (isMoving) {
      buffStep1 = updateOverlap(buffStep0);
    }

    let buffStep2 = buffStep1;
    if (isRunningRight) {
      // Mise à jour des pièces en fonction taille fenêtres et gap entre pice
      const buffStep3 = updateCoinSizeWindow(buffStep1);
      const buffStep4 = updateFromGap(buffStep3);
      // Nouvelles pièces

      buffStep2 = updateSetPosition(buffStep4);
    }

    // console.log(BuffPositionUpdated);
    // RENDER WITH NEW POSITIONS
    setPiecesCoord((prevPos) =>
      buffStep2.map((piece, index) => ({
        ...prevPos[index],
        x: piece.x,
        y: piece.y,
      }))
    );
  };

  /* ======================================  TRIGGERS ===================================== */

  // COMPONENT MOUNTED
  useEffect(() => {
    if (PiecesCoord.length === 0) {
      setPiecesCoord([piece]);
    }
  }, []);

  useEffect(() => {
    let intervalPiece = null;

    if (isMoving) {
      intervalPiece = setInterval(() => {
        updatePieces();
      }, speed.duration);
    } else {
      clearInterval(intervalPiece);
    }

    return () => {
      clearInterval(intervalPiece);
    };
  }, [isRunningRight, isMoving, PiecesCoord]);

  // useEffect(() => {
  //   console.log("TEST");
  // }, [MonkeyCoordRef.current, MonkeyJumping, isRunningRight]);
  /* ======================================  JSX  ===================================== */

  return (
    <PieceContainer className="Piece-container">
      {PiecesCoord.map((elem) => {
        return (
          <PieceStyle
            key={elem.id}
            posX={elem.x}
            posY={elem.y}
            width={size.width}
            height={size.height}
            src={imgs.src}
            alt="mush"
          />
        );
      })}
    </PieceContainer>
  );
}

export default Piece;

/* ======================================  STYLE ===================================== */

const PieceContainer = styled.div``;

const PieceStyle = styled.img.attrs((props) => ({
  style: {
    position: "absolute",
    height: `${props.height}px`,
    width: `${props.width}px`,
    bottom: `${props.posY ? props.posY : 0}px`,
    right: `${props.posX ? props.posX : 0}px`,
  },
}))`
  /*  */
`;
