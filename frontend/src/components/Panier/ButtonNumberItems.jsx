import { useState } from "react";

import "./ButtonNumberItems.scss";

function ButtonNumberItems() {
  const [numberItem, setNumberItem] = useState(0);

  return (
    <div className="numberItem">
      <input
        className="input1"
        type="button"
        value="-"
        onClick={() => setNumberItem(numberItem - 1)}
        disabled={numberItem === 0}
      />
      <p>{numberItem}</p>
      <input
        className="input2"
        type="button"
        value="+"
        onClick={() => setNumberItem(numberItem + 1)}
      />
    </div>
  );
}

export default ButtonNumberItems;
