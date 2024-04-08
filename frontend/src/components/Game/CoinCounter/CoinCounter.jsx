import "./CoinCounter.scss";

import Planche from "../../../assets/img/03_Tablettes/planche_1.png";

function CoinCounter({ score }) {
  return (
    <div className="wrap-counter">
      <div>{score} Mushs</div>
      <img src={Planche} alt="planche de bois" />
    </div>
  );
}

export default CoinCounter;
