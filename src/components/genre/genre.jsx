import React from "react";
import PropTypes from "prop-types";

const Genre = (props) => {
  const {genres, currentGenre, onGenreClick} = props;
  const navGenres = Object.values(genres);

  return (
    <ul className="catalog__genres-list">
      {navGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

Genre.propTypes = {
  genres: PropTypes.objectOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default Genre;
