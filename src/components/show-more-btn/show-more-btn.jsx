import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={(evt) => {
          evt.preventDefault();
          onShowMoreClick();
        }}
      >Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  onShowMoreClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
