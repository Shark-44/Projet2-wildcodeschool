import { useEffect, useState } from "react";
import TeamCard from "../components/Team/TeamCard";

import imgFondBois from "../assets/img/03_Tablettes/validation.png";
import avatar1 from "../assets/img/04_Team/av_anto.png";
import avatar2 from "../assets/img/04_Team/av_cath.png";
import avatar3 from "../assets/img/04_Team/av_deni.png";
import avatar4 from "../assets/img/04_Team/av_joan.png";
import avatar5 from "../assets/img/04_Team/av_medh.png";
import avatar6 from "../assets/img/04_Team/av_viv.png";
import backgroundTeammate from "../assets/img/04_Team/backgroundTeammate_rbg.png";
import leftArrow from "../assets/img/04_Team/leftArrow.png";
import rightArrow from "../assets/img/04_Team/rightArrow.png";

import "./Team.scss";

const teamsList = [
  {
    id: 1,
    name: "Antoine E.",
    imgSrc: avatar1,
    text: "Antoine, les algos et les useEffects tu dompteras !",
  },
  {
    id: 2,
    name: "Cath O.",
    imgSrc: avatar2,
    text: "La briseuse de defi",
  },
  {
    id: 3,
    name: "Denis C.",
    imgSrc: avatar3,
    text: 'Specialiste du component "boutton"',
  },
  {
    id: 4,
    name: "Joanny B.",
    imgSrc: avatar4,
    text: "Le referent score",
  },
  {
    id: 5,
    name: "Mehdy Hors Taxe",
    imgSrc: avatar5,
    text: "Le specialiste figma et trello (entres autres)",
  },
  {
    id: 6,
    name: "Vivien F.",
    imgSrc: avatar6,
    text: "La force tranquille du panier",
  },
];

function Team() {
  const [teamIndex, setTeamIndex] = useState(0);
  const [tabUseCard, setTabUseCard] = useState([0, 1, 2, 3, 4, 5]);

  const calculIndex = () => {
    const tab = [];
    switch (teamIndex) {
      case 0:
        tab[0] = 5;
        tab[1] = 0;
        tab[2] = 1;
        tab[3] = 2;
        tab[4] = 3;
        tab[5] = 4;
        break;
      case 1:
        tab[0] = 0;
        tab[1] = 1;
        tab[2] = 2;
        tab[3] = 3;
        tab[4] = 4;
        tab[5] = 5;
        break;
      case 2:
        tab[0] = 1;
        tab[1] = 2;
        tab[2] = 3;
        tab[3] = 4;
        tab[4] = 5;
        tab[5] = 0;
        break;
      case 3:
        tab[0] = 2;
        tab[1] = 3;
        tab[2] = 4;
        tab[3] = 5;
        tab[4] = 0;
        tab[5] = 1;
        break;
      case 4:
        tab[0] = 3;
        tab[1] = 4;
        tab[2] = 5;
        tab[3] = 0;
        tab[4] = 1;
        tab[5] = 2;
        break;
      case 5:
        tab[0] = 4;
        tab[1] = 5;
        tab[2] = 0;
        tab[3] = 1;
        tab[4] = 2;
        tab[5] = 3;
        break;
      default:
        console.info("Sorry, bro.");
    }
    setTabUseCard(tab);
  };

  const handleClickD = () =>
    teamIndex + 1 > teamsList.length - 1
      ? setTeamIndex(0)
      : setTeamIndex((teamIndex) => teamIndex + 1);

  const handleClickG = () =>
    teamIndex - 1 < 0
      ? setTeamIndex(teamsList.length - 1)
      : setTeamIndex((teamIndex) => teamIndex - 1);

  useEffect(() => {
    calculIndex();
  }, [teamIndex]);

  return (
    <div className="teamGlobal">
      <div className="header">
        <div className="titleBack">
          <img src={imgFondBois} alt="imgBois" />
          <div className="titleFront">
            <span>La Team</span>
          </div>
        </div>
      </div>
      <div className="carrousel">
        <div className="carrousel__item item_ext ext_left">
          <TeamCard team={teamsList[tabUseCard[0]]} />
        </div>
        <div className="carrousel__item item_int int_left">
          <TeamCard team={teamsList[tabUseCard[1]]} />
        </div>
        <div className="carrousel__item">
          <div className="item_center">
            <TeamCard team={teamsList[tabUseCard[2]]} active />
            <div className="overlay">
              <p className="overlay__text">{teamsList[tabUseCard[2]].text}</p>
            </div>
          </div>
        </div>
        <div className="carrousel__item item_int int_right">
          <TeamCard team={teamsList[tabUseCard[3]]} />
        </div>
        <div className="carrousel__item item_ext ext_right">
          <TeamCard team={teamsList[tabUseCard[4]]} />
        </div>
      </div>
      <div className="footer">
        <div className="boutton">
          <img src={leftArrow} alt="leftArrow" />
          <div className="btPrecedent">
            <input type="button" onClick={handleClickG} />
          </div>
        </div>
        <div className="teamMateGlobal">
          <div className="teamMateImg">
            <img src={backgroundTeammate} alt="backgroundTeammate" />
            <div className="teamMateText">{teamsList[tabUseCard[2]].name}</div>
          </div>
        </div>
        <div className="boutton ">
          <img src={rightArrow} alt="rightArrow" />
          <div className="btSuivant">
            <input type="button" onClick={handleClickD} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
