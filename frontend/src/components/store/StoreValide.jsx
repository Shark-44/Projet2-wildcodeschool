import { Link } from "react-router-dom";

import "./StoreValide.scss";

function StoreValide({ title, path }) {
  return (
    <div className="storeChoiceValidation1">
      <div className="storeChoiceButton1">
        <div className="buttonLinkStoreToPanier">
          <Link to={path}>{title}</Link>
        </div>
      </div>
    </div>
  );
}

export default StoreValide;
