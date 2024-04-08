import { useEffect, useState } from "react";

export function useKeyboard() {
  const [isKeyLeft, setIsKeyLeft] = useState(false);
  const [isKeyRight, setIsKeyRight] = useState(false);
  const [isKeyBottom, setIsKeyBottom] = useState(false);
  const [isKeyTop, setIsKeyTop] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setIsKeyTop(true);
          // setIsKeyDown(false);

          break;

        case "ArrowDown":
          // setIsKeyUp(false);
          setIsKeyBottom(true);

          break;

        case "ArrowLeft":
          setIsKeyLeft(true);
          // setIsKeyRight(false);

          break;

        case "ArrowRight":
          // setIsKeyLeft(false);
          setIsKeyRight(true);

          break;

        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setIsKeyTop(false);

          break;

        case "ArrowDown":
          setIsKeyBottom(false);

          break;

        case "ArrowLeft":
          setIsKeyLeft(false);

          break;

        case "ArrowRight":
          setIsKeyRight(false);

          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isKeyLeft, isKeyRight, isKeyTop, isKeyBottom };
}
