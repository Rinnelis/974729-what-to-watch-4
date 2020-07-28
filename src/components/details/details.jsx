import React from "react";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {Time} from "../../const.js";

const Details = (props) => {
  const {film} = props;
  const {director, starring, runTime, genre, releaseDate} = film;

  const getStarring = (actors) => {
    return actors.join(`, `);
  };

  const getHours = () => {
    const hours = Math.trunc(runTime / Time.MINUTES_PER_HOUR);
    return hours > 0 ? `${hours}h` : ``;
  };

  const getMinutes = () => {
    const minutes = runTime % Time.SECONDS_PER_MINUTE;
    return minutes > 0 ? `${minutes}m` : ``;
  };

  const time = `${getHours()} ${getMinutes()}`;

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {getStarring(starring)}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{time}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{releaseDate}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

Details.propTypes = {
  film: ProjectPropTypes.FILM.isRequired,
};

export default Details;
