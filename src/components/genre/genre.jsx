import React from "react";
import PropTypes from "prop-types";
import {MAX_GENRES_AMOUNT} from "../../const.js";

const Genre = (props) => {
  const {genres, currentGenre, onGenreClick, onGenreChange} = props;
  const navGenres = genres.slice(0, MAX_GENRES_AMOUNT);

  return (
    <ul className="catalog__genres-list">
      {navGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
            onGenreChange();
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

Genre.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
};

export default React.memo(Genre);
