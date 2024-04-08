import "./Login.scss";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../../services/General_context";
import bpPlay from "../../assets/img/01_Boutons/play.png";

function Login({ setShowRegister, back }) {
  const [usernameLog, setUsernameLog] = useState("");
  const [pswdLog, setpswdLog] = useState("");
  const [errorLog, setErrorLog] = useState(false);

  const nav = useNavigate();

  const { isLogged, setIsLogged, setMushWallet, setIsGuest } =
    useContext(GeneralContext);

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/login", {
        username: usernameLog,
        password: pswdLog,
      })
      .then((response) => {
        if (response && response.status === 200) {
          console.info("Logué !");

          /* Sauvegarde dans localStorage des infos utilisateurs */
          const { mail, username, id, mushs } = response.data;
          localStorage.clear();
          /* -- */
          localStorage.setItem("mail", mail);
          localStorage.setItem("id", JSON.stringify(id));
          /* -- */
          localStorage.setItem("mushs", JSON.stringify(mushs));
          localStorage.setItem("pseudo", username);
          /* -- */
          localStorage.setItem("guest", JSON.stringify(false));
          localStorage.setItem("logged", JSON.stringify(true));
          /* -- */
          setMushWallet(mushs);
          setIsGuest(false);
        }
        setIsLogged(true);
      })

      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorLog(true);
        }
      });
  };

  /* FONCTIONS */

  const showRegister = () => {
    setShowRegister(true);
  };

  const handleMail = (e) => {
    setUsernameLog(e.target.value);
    setErrorLog(false);
  };

  const handlePswd = (e) => {
    setpswdLog(e.target.value);
    setErrorLog(false);
  };

  const handleGame = () => {
    nav("/Game");
  };

  /* JSX */

  return (
    <div className="wrap-login">
      <div className="title">
        <button type="button" id="btn-back" onClick={back}>
          {" "}
        </button>
        <span id="login-title"> Login </span>
      </div>

      {!isLogged ? (
        <div className="wrap-login-form">
          <div className="email">
            <label htmlFor="email">Email Address</label>
            <input
              className={`input_form ${errorLog ? "erreur" : "default"}`}
              type="email"
              name="email"
              placeholder="jeanmichmouch@gmail.com"
              onChange={handleMail}
            />
          </div>
          <div className="pass">
            <label htmlFor="pass">Password</label>
            <input
              className={`input_form ${errorLog ? "erreur" : null}`}
              type="password"
              name="pass"
              placeholder="password"
              onChange={handlePswd}
            />
          </div>
          {errorLog && (
            <span className="error-text">
              {" "}
              ❌Incorrect username or password !{" "}
            </span>
          )}
          <div className="log-validation">
            <button id="login" type="submit" onClick={handleLogin}>
              {" "}
              Login{" "}
            </button>
            <span id="login-forgot"> Forgot password ? </span>
            <button id="signin" type="button" onClick={showRegister}>
              {" "}
              Sign in !{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="wrap-user-logged">
          <div className="wrap-user-logged-content">
            <span className="text-welcome">
              {" "}
              Welcome {localStorage.getItem("pseudo")} ! Hope you will survive
            </span>
            <button
              className="user-logged-btn"
              type="button"
              onClick={handleGame}
            >
              <img id="user-logged-bpPlay" src={bpPlay} alt="Play" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
