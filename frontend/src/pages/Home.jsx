// import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.scss";
// import LoginForm from "../components/Form/LoginForm";
// import GeneralContext from "../services/General_context";
import FormAccueil from "../components/Form/FormAccueil";
import FormChoice from "../components/Form/ChoiceUser";
import GeneralContext from "../services/General_context";

function Home() {
  // TYPE NAV
  // const { isLogged } = useContext(GeneralContext);
  const [isInvited, setIsInvited] = useState(false);
  const nav = useNavigate();
  console.info(isInvited);

  // STATE FORMS
  const [showFormAccueil, setShowFormAccueil] = useState(true);
  const [showFormLogin, setShowFormLogin] = useState(false);
  console.info(showFormLogin);
  const [showFormChoice, setShowFormChoice] = useState(false);
  const [pseudoGuest, setPseudoGuest] = useState("");
  const [errorInputGuest, setErrorInputGuest] = useState(false);

  const { isLogged, setIsGuest, setMushWallet } = useContext(GeneralContext);

  /* ==================== FONCTIONS DE NAV ======================= */

  // const isLogged = JSON.parse(localStorage.getItem("logged"));

  const handleAccueil = () => {
    setShowFormAccueil(true);
    setShowFormChoice(false);
    setShowFormLogin(false);
  };

  const handleChoice = () => {
    setShowFormAccueil(false);
    setErrorInputGuest(false);
    if (!isLogged) {
      setShowFormChoice(true);
    } else {
      nav("/Game");
    }
  };

  // Recupération username Guest
  const onClickInvited = () => {
    if (pseudoGuest !== "") {
      localStorage.clear();
      localStorage.setItem("pseudo", pseudoGuest);
      localStorage.setItem("mushs", JSON.stringify(0));
      /* -- */
      localStorage.setItem("guest", JSON.stringify(true));
      localStorage.setItem("logged", JSON.stringify(false));
      /*--*/
      setMushWallet(0);
      setIsGuest(true);
      /*--*/
      setShowFormChoice(false);
      nav("/Game");
      setIsGuest(true);
    } else {
      setErrorInputGuest(true);
      // console.log("Veuillez rentrer un pseudo ! Milesker");
    }
  };

  const onclickLog = () => {
    if (isLogged) {
      setShowFormChoice(false);
      nav("/Game");
      // setShowFormLevel(true);
      setIsInvited(false);
    } else {
      nav("/Login");
    }
  };

  /* ============================ JSX =============================== */
  return (
    <div className="Container">
      {/* FORM ACCUEIL */}
      {showFormAccueil ? <FormAccueil onClick={handleChoice} /> : null}

      {/* FORM CHOIX INVITE OU LOG */}
      {showFormChoice ? (
        <FormChoice
          back={handleAccueil}
          onClickInvited={onClickInvited}
          onclickLog={onclickLog}
          setPseudoGuest={setPseudoGuest}
          errorInputGuest={errorInputGuest}
          setErrorInputGuest={setErrorInputGuest}
        />
      ) : null}

      {/* FORM LANCEMENT */}
      {/* {showFormLevel ? (
        <UserLevel userName={localStorage.getItem("pseudo")} />
      ) : null} */}

      {/* FORM LOGGIN */}
      {/* {showFormLogin ? <LoginForm back={handleAccueil} /> : null} */}
    </div>
  );
}
export default Home;
