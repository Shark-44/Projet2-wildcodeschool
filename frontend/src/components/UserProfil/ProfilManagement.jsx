import React, { useState } from "react";
import axios from "axios";

import "./ProfilManagement.scss";

import PlantLeft from "./imgUserprofile/plantLeft.png";
import PlantRight from "./imgUserprofile/plantRight.png";

function ProfilManagement() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      newUsername: inputValue,
      userId: JSON.parse(localStorage.getItem("id")),
    };
    axios
      .post("http://localhost:8000/change-username", data)
      .then((response) => {
        // console.log(response);
        setMessage(response.data.message);
        localStorage.setItem("pseudo", inputValue);
      })
      .catch((error) => {
        setMessage(
          "Une erreur s'est produite lors de la modification de votre username."
        );
        console.error(error);
      });
  };

  return (
    <div className="wrapContainerProfilManagement">
      <div className="profilManagGlobal">
        <div className="titleUsername">
          <span>Changer le nom d'utilisateur</span>
        </div>
        <div className="actualUsername">{localStorage.getItem("pseudo")}</div>
        {/* <div className="actualUsername">{username}</div> */}
        <div className="newUsername">
          <span>Nouveau nom d'utilisateur</span>
          <input
            type="text"
            placeholder="suggestion appuyee : LukeSky_de_Tatooine"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="saveNewUsername">
          <img id="PlantLeft" src={PlantLeft} alt="feuille gauche" />
          <img id="PlantRight" src={PlantRight} alt="feuille droite" />
          <button type="button" onClick={handleSubmit}>
            Enregistrer
          </button>
        </div>
        {message && <div className="messageErrorChangeUsername">{message}</div>}
      </div>
    </div>
  );
}

export default ProfilManagement;
