import "./Signup.scss";
import axios from "axios";
import { useState } from "react";

function Signup({ setShowRegister, isRegister, setIsRegister, back }) {
  const [mailDb, setMailDb] = useState("");
  const [passwordDb, setPasswordDb] = useState("");
  const [password2, setPassword2] = useState("");
  const [pseudoDb, setPseudoDb] = useState("");
  const [erreurSaisie, setErreurSaisie] = useState(false);
  const [erreurType, setErreurType] = useState("");
  console.info(password2);

  // console.ingo(setIsRegister);

  // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const verif = (passwordDb, password2, mailDb) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; /* format mdp */
    const mailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; /* format mail */

    if (!passwordRegex.test(passwordDb)) {
      setErreurType(
        "Password must contain at least 1 of each : uppercase, lowercase, special and number "
      );
      return false;
    }
    if (passwordDb !== password2) {
      setErreurType("Password must be equal");
      return false;
    }
    if (!mailRegex.test(mailDb)) {
      setErreurType("not valid email");
      return false;
    }
    setErreurType("");
    return true;
  };

  const showLogin = () => {
    setShowRegister(false);
  };

  const handleRegistered = () => {
    // e.preventDefault(); // Empêche la soumission par défaut du formulaire
    // console.log("mail :" + mailDb + " pass: " + passwordDb);
    if (verif(passwordDb, password2, mailDb)) {
      // e.preventDefault(); // Empêche la soumission par défaut du formulaire
      // console.log("mail :" + mailDb + " pass: " + passwordDb);
      axios
        .post("http://localhost:8000/register", {
          mail: mailDb,
          password: passwordDb,
          username: pseudoDb,
        })
        .then((response) => {
          if (response && response.status === 200) {
            setIsRegister(true);
          }
        });
    } else {
      setErreurSaisie(true);
    }
  };

  const handlePass = (e) => {
    setPasswordDb(e.target.value);
    setErreurSaisie(false);
  };

  const handlePass2 = (e) => {
    setPassword2(e.target.value);
    setErreurSaisie(false);
  };

  const handleMail = (e) => {
    setMailDb(e.target.value);
    setErreurSaisie(false);
  };

  const handlePseudo = (e) => {
    setPseudoDb(e.target.value);
    setErreurSaisie(false);
    // console.log(pseudoDb);
  };

  function handleInfos() {
    alert(
      "Wrong informations ! Use valid mail or the password must include at least 8 characters with: 1 uppercase character, 1 lowercase character, 1 special character, 1 number. "
    );
  }

  return (
    <div className="wrap-signup">
      <button type="button" id="btn-back" onClick={back}>
        {" "}
      </button>
      <span id="signin-title"> Ready.... ?</span>
      {erreurSaisie ? (
        <div className="wrap-err-saisie">
          <span className="error-saisie"> {erreurType} </span>
        </div>
      ) : (
        <span id="signin-2"> 🦁🦁 </span>
      )}

      {!isRegister ? (
        <div className="wrap-signup-content">
          <div className="pseudo">
            <label htmlFor="pseudo"> Pseudo </label>
            <input
              className={`input_form ${erreurSaisie ? "erreur" : "default"}`}
              type="text"
              name="pseudo"
              placeholder="MichouDu33"
              onChange={handlePseudo}
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email Address</label>
            <input
              className={`input_form ${erreurSaisie ? "erreur" : "default"}`}
              type="email"
              name="email"
              placeholder="username@gmail.com"
              onChange={handleMail}
            />
          </div>
          <div className="pass">
            <label htmlFor="pass">Password</label>
            <input
              className={`input_form ${erreurSaisie ? "erreur" : "default"}`}
              type="password"
              name="pass"
              placeholder="password"
              onChange={handlePass}
            />
          </div>
          <div className="pass">
            <label htmlFor="pass2">Repeat password</label>
            <input
              className={`input_form ${erreurSaisie ? "erreur" : "default"}`}
              type="password"
              name="pass2"
              placeholder="password"
              onChange={handlePass2}
            />
          </div>
          <div className="log-validation">
            <button id="register" type="submit" onClick={handleRegistered}>
              Register!
            </button>
            <button id="back" type="button" onClick={showLogin}>
              <span className="btn-emoji">👈</span>
              <span className="btn-text">Back to login page</span>
            </button>
            <button id="informations" type="button" onClick={handleInfos}>
              <span className="btn-infos">Help</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-registered">
          <span>
            {" "}
            Welcome to the jungle! <br /> Be ready ....{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default Signup;
