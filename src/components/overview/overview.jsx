import React from "react";
import PropTypes from "prop-types";
import {RatingLevel} from '../../const.js';

const getRatingLevel = (count) => {
  let ratingLevel = ``;
  if (count < 3) {
    ratingLevel = RatingLevel.BAD;
  } else if (count >= 3 && count < 5) {
    ratingLevel = RatingLevel.NORMAL;
  } else if (count >= 5 && count < 8) {
    ratingLevel = RatingLevel.GOOD;
  } else if (count >= 8 && count < 10) {
    ratingLevel = RatingLevel.VERY_GOOD;
  } else {
    ratingLevel = RatingLevel.AWESOME;
  }
  return ratingLevel;
};

const getStarring = (actors) => {
  return actors.slice(0, 4).join(`, `);
};

const getRatingScore = (score) => {
  return score.toFixed(1).toString().replace(`.`, `,`);
};

const Overview = (props) => {
  const {film} = props;
  const {ratingScore, ratingCount, description, director, starring} = film;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{getRatingScore(ratingScore)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(ratingScore)}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description}

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {getStarring(starring)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

Overview.propTypes = {
  film: PropTypes.shape({
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired
};

export default Overview;
