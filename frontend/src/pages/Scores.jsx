import { useEffect, useState } from "react";
import axios from "axios";

import ScoreReturn from "../components/Scores/ScoreReturn";
import imgTablette from "../assets/img/03_Tablettes/table.png";
import "./Scores.scss";

function Scores() {
  const [scores, setScores] = useState([]);
  const [request, setRequest] = useState(false);
  console.info(request);
  useEffect(() => {
    axios
      .get("http://localhost:8000/scores")
      .then((response) => {
        // console.log(response);
        setScores(response.data);
        setRequest(true);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    if (scores) {
      // console.log(scores.facile);
    }
  }, [scores]);

  return (
    <div className="wrap-scores">
      <div className="titreScores">
        <p className="titreTableau">Tableaux des Scores</p>
      </div>
      <div className="tableauAffichage">
        <div className="tableau type1">
          <div className="tablette scoresFacile">
            <img className="tablette-img" src={imgTablette} alt="test" />
            <div className="tablette-content">
              <span className="text">"Facile"</span>
              <ScoreReturn data={scores.facile} />
            </div>
          </div>
        </div>
        <div className="tableau type2">
          <div className=" tablette scoresDifficile ">
            <img className="tablette-img" src={imgTablette} alt="test" />
            <div className="tablette-content">
              <span className="text">"Difficile"</span>
              <ScoreReturn data={scores.difficile} />
            </div>
          </div>
        </div>
        <div className="tableau type3">
          <div className="tablette scoresMoyen">
            <img className="tablette-img" src={imgTablette} alt="test" />
            <div className="tablette-content">
              <span className="text">"Moyen"</span>
              <ScoreReturn data={scores.moyen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scores;
