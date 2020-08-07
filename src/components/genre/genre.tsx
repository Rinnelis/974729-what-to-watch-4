import * as React from "react";
import {Films} from "../../types";
import {MAX_GENRES_AMOUNT} from "../../const";

interface Props {
  films: Films;
  genres: string[];
  currentGenre: string;
  onGenreClick: (genre: string, films: Films) => void;
  onGenreChange: () => void;
}

const Genre: React.FunctionComponent<Props> = (props: Props) => {
  const {films, genres, currentGenre, onGenreClick, onGenreChange} = props;
  const navGenres = genres.slice(0, MAX_GENRES_AMOUNT);

  return (
    <ul className="catalog__genres-list">
      {navGenres.map((genre) => (
        <li key={genre}
          className={currentGenre === genre ? `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre, films);
            onGenreChange();
          }}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(Genre);
