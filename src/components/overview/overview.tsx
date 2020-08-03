import * as React from "react";
import {Film} from "../../types.js";
import {getRatingLevel, getOverviewStarring, getRatingScore} from "../../utils";

interface Props {
  film: Film;
}

const Overview: React.FunctionComponent<Props> = (props: Props) => {
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

        <p className="movie-card__starring"><strong>Starring: {getOverviewStarring(starring)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

export default Overview;
