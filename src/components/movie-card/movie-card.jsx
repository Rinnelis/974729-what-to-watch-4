import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {film, onMouseEnter, onCardClick} = props;
  const {title, image} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onMouseEnter(film)}
    >
      <div className="small-movie-card__image" onClick={onCardClick}>
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={onCardClick}
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {title}
        </a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default MovieCard;
