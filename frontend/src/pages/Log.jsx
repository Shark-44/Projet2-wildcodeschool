import { useNavigate } from "react-router-dom";

import "./Log.scss";
import LoginForm from "../components/Form/LoginForm";

function Log() {
  const nav = useNavigate();

  const handleAccueil = () => {
    nav("/");
  };

  return (
    <div className="wrap-Log">
      <LoginForm back={handleAccueil} />;
    </div>
  );
}

export default Log;
