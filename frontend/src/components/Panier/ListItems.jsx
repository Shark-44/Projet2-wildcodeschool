import PropTypes from "prop-types";

import "./ListItems.scss";

function ListItems() {
  return <p className="item"> Bananes</p>;
}

ListItems.propTypes = {
  storeList: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItems;
