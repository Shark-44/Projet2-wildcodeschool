import { useEffect, useState } from "react";

import "./TeamCard.scss";

function TeamCard({ team, active }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (active) {
      setRender(true);

      setTimeout(() => {
        setRender(false);
      }, 1000);
    }
  }, [team]);

  return (
    <div className={`avatar ${render ? "anim" : ""}`}>
      <img src={team.imgSrc} alt={team.name} />
    </div>
  );
}

export default TeamCard;
