import { useState, useEffect } from "react";

function Square() {
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);

  const groundHeight = 0;

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setIsMovingLeft(true);
          break;
        case "ArrowRight":
          setIsMovingRight(true);
          break;
        case "ArrowUp":
          if (!isJumping) {
            setIsJumping(true);
            setBottom((prevBottom) => prevBottom + 5);
          }
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setIsMovingLeft(false);
          break;
        case "ArrowRight":
          setIsMovingRight(false);
          break;
        case "ArrowUp":
          setIsJumping(false);
          break;
        default:
          break;
      }
    };

    const jumpInterval = setInterval(() => {
      if (isJumping) {
        setBottom((prevBottom) => {
          const nextBottom = prevBottom + 8;
          if (nextBottom >= 100) {
            setIsJumping(false);
          }
          return nextBottom;
        });
      } else {
        setBottom((prevBottom) => {
          const nextBottom = prevBottom - 5;
          if (nextBottom <= groundHeight) {
            return groundHeight;
          }
          return nextBottom;
        });
      }
    }, 10);

    const moveInterval = setInterval(() => {
      setLeft((prevLeft) => {
        let nextLeft = prevLeft;
        if (isMovingLeft) {
          nextLeft -= 5;
        }
        if (isMovingRight) {
          nextLeft += 5;
        }
        const windowWidth = window.innerWidth;
        const squareWidth = 50; // Largeur du carré
        if (nextLeft <= -squareWidth) {
          nextLeft = windowWidth; // Réapparaît à droite lorsque le carré sort de l'écran à gauche
        } else if (nextLeft >= windowWidth) {
          nextLeft = -squareWidth; // Réapparaît à gauche lorsque le carré sort de l'écran à droite
        }
        return nextLeft;
      });
    }, 20);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(jumpInterval);
      clearInterval(moveInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping, isMovingLeft, isMovingRight]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        bottom: `${bottom}px`,
        width: "50px",
        height: "50px",
        backgroundColor: "red",
      }}
    />
  );
}

export default Square;
