import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./LoginForm.scss";

import tabletteVerticale from "../../assets/img/03_Tablettes/tablette_bois_verticale.png";

function LoginForm({ back }) {
  const [showRegister, setShowRegister] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    setIsLoginFormVisible(true);
    setShowRegister(false);
  }, []);

  return (
    <div
      className={`wrap-LoginForm ${
        isLoginFormVisible && (showRegister ? "appearX appearY" : "appearY")
      }`}
    >
      <div className="Login-bgForm">
        <img id="loginForm-bg" src={tabletteVerticale} alt="bg-login" />
        <div className="Login-signin">
          {/* <Login /> */}
          {showRegister ? (
            <Signup
              setShowRegister={setShowRegister}
              setIsRegister={setIsRegister}
              isRegister={isRegister}
              back={back}
            />
          ) : (
            <Login setShowRegister={setShowRegister} back={back} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
