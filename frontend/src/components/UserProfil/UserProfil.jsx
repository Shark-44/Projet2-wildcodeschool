import React, { useState, useEffect } from "react";
import axios from "axios";

import "./UserProfil.scss";

import OrderHistory from "./OrderHistory";
import ChangePassword from "./ChangePassword";
import DeleteProfil from "./DeleteProfil";
import ProfilManagement from "./ProfilManagement";

import PlancheJaune from "./imgUserprofile/planchejaune.png";
import PlancheMarron from "./imgUserprofile/planchemarron.png";
import PlancheButton from "./imgUserprofile/plancheBouton2.png";
import SingeProfil from "./imgUserprofile/singeprofil.png";

function UserProfil() {
  const [selectedInfo, setSelectedInfo] = useState("");
  const [responseData, setResponseData] = useState("");

  console.info(responseData);

  const handleLinkClick = (info) => {
    setSelectedInfo(info);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/userprofil")
      .then((response) => {
        setResponseData(response.data);
        // localStorage.setItem("pseudo");
        // setPseudo(localStorage.getItem("pseudo"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="wrapUserProfil">
      <div className="wrapUserSetting">
        <div className="imgProfilPictureUser">
          <img src={SingeProfil} alt="profil singe" />
        </div>
        <div className="responseDatabaseUserProfil">
          {localStorage.getItem("pseudo")}
        </div>
        <div className="wrapUserList">
          <img src={PlancheJaune} alt="planche jaune" />
          <ul>
            <li>
              <div className="wrapButtonSetting">
                <button
                  type="button"
                  onClick={() => handleLinkClick(<OrderHistory />)}
                >
                  Historique des commandes
                </button>
                <img src={PlancheButton} alt="Planche button" />
              </div>
            </li>
            <li>
              <div className="wrapButtonSetting">
                <button
                  type="button"
                  onClick={() => handleLinkClick(<ProfilManagement />)}
                >
                  Changer le nom d'utilisateur
                </button>
                <img src={PlancheButton} alt="Planche button" />
              </div>
            </li>
            <li>
              <div className="wrapButtonSetting">
                <button
                  type="button"
                  onClick={() => handleLinkClick(<ChangePassword />)}
                >
                  Changer le mot de passe
                </button>
                <img src={PlancheButton} alt="Planche button" />
              </div>
            </li>
            <li>
              <div className="wrapButtonSetting">
                <button
                  type="button"
                  onClick={() => handleLinkClick(<DeleteProfil />)}
                >
                  Supprimer le profil
                </button>
                <img src={PlancheButton} alt="Planche button" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrapUserInfo">
        <img src={PlancheMarron} alt="planche marron" />
        <p>{selectedInfo}</p>
      </div>
    </div>
  );
}

export default UserProfil;
