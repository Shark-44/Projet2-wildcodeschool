import React, { useState } from "react";
import axios from "axios";

import "./ChangePassword.scss";

import PlantLeft from "./imgUserprofile/plantLeft.png";
import PlantRight from "./imgUserprofile/plantRight.png";
import Oeil from "./imgUserprofile/oeil.png";

function ChangePassword() {
  const [inputValueActual, setInputValueActual] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  const handleTogglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleTogglePassword2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
  };

  const handleRestorePassword = () => {
    setInputType("password");
  };

  const handleRestorePassword2 = () => {
    setInputType2("password");
  };

  const handleInputChangeActual = (event) => {
    setInputValueActual(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      oldPassword: inputValueActual,
      newPassword: inputValue,
      id: JSON.parse(localStorage.getItem("id")),
    };

    axios
      .post("http://localhost:8000/change-password", data)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(
          "Une erreur s'est produite lors de la modification du mot de passe."
        );
        console.error(error);
      });
  };

  return (
    <div className="wrapContainerChangePassword">
      <div className="testUserPassword">
        <div className="titlePassword">
          <span id="titlePassword">Changer le mot de passe</span>
        </div>
        <div className="actualPassword">
          <span>Mot de passe actuel</span>
          <div className="inputFormPassword">
            <input
              type={inputType}
              value={inputValueActual}
              onChange={handleInputChangeActual}
            />
            <button
              type="button"
              onMouseEnter={handleTogglePassword}
              onMouseLeave={handleRestorePassword}
            >
              <img src={Oeil} alt="Oeil" />
            </button>
          </div>
        </div>
        <div className="newPassword">
          <span>Nouveau mot de passe</span>
          <div className="inputFormPassword">
            <input
              type={inputType2}
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onMouseEnter={handleTogglePassword2}
              onMouseLeave={handleRestorePassword2}
            >
              <img src={Oeil} alt="Oeil" />
            </button>
          </div>
        </div>
        <div className="saveNewPassword">
          <img id="PlantLeft" src={PlantLeft} alt="feuille gauche" />
          <img id="PlantRight" src={PlantRight} alt="feuille droite" />
          <button type="button" onClick={handleSubmit}>
            Enregistrer
          </button>
        </div>
        {message && <div className="messageErrorChangePassword">{message}</div>}
      </div>
    </div>
  );
}

export default ChangePassword;
