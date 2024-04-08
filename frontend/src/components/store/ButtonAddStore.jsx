import { useState } from "react";

import "./ButtonAddStore.scss";

function ButtonAddStore() {
  const [numberItem, setNumberItem] = useState(0);

  return (
    <div className="storeNumberItem">
      <input
        className="storeInput1"
        type="button"
        value="-"
        onClick={() => setNumberItem(numberItem - 1)}
        disabled={numberItem === 0}
      />
      <p>{numberItem}</p>
      <input
        className="storeInput2"
        type="button"
        value="+"
        onClick={() => setNumberItem(numberItem + 1)}
      />
    </div>
  );
}

export default ButtonAddStore;
