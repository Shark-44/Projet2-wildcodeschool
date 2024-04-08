import "./ButtonMain.scss";
import { Link } from "react-router-dom";
import imgBois from "../../assets/img/03_Tablettes/planche_1.png";

function ButtonMain({ title, chemin, onClick }) {
  return (
    <div className="MainButton">
      <div className="MainButton-wrapImg">
        <img src={imgBois} alt="imgBois" />

        <Link to={chemin}>
          <button
            className="MainButton-buttonLink"
            type="button"
            onClick={onClick}
          >
            {title}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ButtonMain;
