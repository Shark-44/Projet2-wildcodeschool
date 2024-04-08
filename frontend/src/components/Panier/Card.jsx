import ButtonNumberItems from "./ButtonNumberItems";
import CumulPrice from "./CumulPrice";
import ListItems from "./ListItems";

import "./Card.scss";

function Card() {
  return (
    <div className="card">
      <ListItems />
      <ButtonNumberItems />
      <CumulPrice />
    </div>
  );
}

export default Card;
