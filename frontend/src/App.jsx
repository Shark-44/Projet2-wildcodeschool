import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Home from "./pages/Home";
import Interact from "./components/Game/Interactions";
import NavBar from "./components/NavbarHeader/NavBar";
// import Panier from "./pages/Panier";
import Cart from "./pages/Cart/Cart";
import Store from "./pages/Store";
import Tutoriel from "./pages/Tutoriel";
import Scores from "./pages/Scores";
import Team from "./pages/Team";
import UserProfil from "./components/UserProfil/UserProfil";
import Log from "./pages/Log";
// SOUNDS
import musicOn from "./assets/img/01_Boutons/musicOn.png";
import musicOff from "./assets/img/01_Boutons/musicOff.png";
import soundBackground from "./assets/sounds/tribalLoop.mp3";

// IMAGES BAKGROUNDS
import bgImg1 from "./assets/img/02_Images/backgrounds/backG1.png";
import backGame from "./assets/img/02_Images/backgrounds/Game/PNG/tawz2_4k.png";
import "./App.scss";
import UserLevel from "./components/Game/UserLevel/UserLevel";

// CONTEXT
import GeneralContext from "./services/General_context";
import ShopContextProvider from "./context/StoreContext";

function App() {
  const soundBackgroundGenRef = useRef(new Audio(soundBackground));
  const location = useLocation();
  const [bgGame] = useState(backGame);
  // console.info(setBgGame);

  const [imgSoundGen, setImgSoundGen] = useState(musicOff);
  const [soundGenActive, setSoundGenActive] = useState(false);
  const [musicEnCours, setMusicEnCours] = useState(false);

  const [isLogged, setIsLogged] = useState(false);
  const [mushWallet, setMushWallet] = useState(null);
  const [isGuest, setIsGuest] = useState(null);

  const toggleMusicActive = () => {
    setSoundGenActive((prevState) => !prevState);
    setImgSoundGen(soundGenActive ? musicOff : musicOn);
    setMusicEnCours(!musicEnCours);
  };

  useEffect(() => {
    localStorage.setItem("init", false);
    const LocalIsLogged = JSON.parse(localStorage.getItem("logged"));
    const LocalMushWallet = JSON.parse(localStorage.getItem("mushs"));
    setIsLogged(LocalIsLogged);
    setMushWallet(LocalMushWallet);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/Game" && !musicEnCours && soundGenActive) {
      soundBackgroundGenRef.current.volume = 0.8;
      soundBackgroundGenRef.current.loop = true;
      soundBackgroundGenRef.current.play();
    } else {
      soundBackgroundGenRef.current.pause();
      setMusicEnCours(false);
    }
  }, [location.pathname, soundGenActive, musicEnCours]);

  useEffect(() => {
    // console.log(isLogged);
  }, [isLogged]);

  return (
    <>
      {/* IMAGE BACKGROUND */}
      {location.pathname !== "/Game" ? (
        <div className="backgroundImg">
          <img src={bgImg1} alt="" />
        </div>
      ) : (
        <div className="backgroundImg">
          <img src={bgGame} alt="" />
        </div>
      )}

      {/* WRAP APPLICATION */}
      <div className="wrap-app">
        {/* HEADER */}

        {/* CONTENU */}
        <GeneralContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{
            isLogged,
            setIsLogged,
            setMushWallet,
            setIsGuest,
            mushWallet,
            isGuest,
          }}
        >
          <ShopContextProvider>
            {location.pathname !== "/Game" && (
              <div className="wrap-nav">
                <NavBar />
              </div>
            )}

            {location.pathname !== "/Game" ? (
              <div className="wrap-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/tutoriel" element={<Tutoriel />} />
                  <Route path="/scores" element={<Scores />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/level" element={<UserLevel />} />
                  <Route path="/profil" element={<UserProfil />} />
                  <Route path="/login" element={<Log />} />
                </Routes>
              </div>
            ) : (
              <div className="wrap-content-game">
                <Routes>
                  <Route path="/Game" element={<Interact />} />
                </Routes>
              </div>
            )}
          </ShopContextProvider>
        </GeneralContext.Provider>

        {location.pathname !== "/Game" && (
          <button
            id="soundGeneralActive"
            type="button"
            onClick={toggleMusicActive}
          >
            <img src={imgSoundGen} alt="Bouton Pause" />
          </button>
        )}
      </div>
    </>
  );
}

export default App;
