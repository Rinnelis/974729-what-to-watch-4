import {ALL_GENRES, SIMILAR_FILMS_AMOUNT} from "../../const.js";
import {NameSpace} from "../name-space.js";

export const getCurrentGenre = (state) => state[NameSpace.MOVIES].currentGenre;

export const getFilmsByGenre = (state) => {
  const films = state[NameSpace.DATA].films;
  const currentGenre = state[NameSpace.MOVIES].currentGenre;

  if (currentGenre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === currentGenre);
};

export const getChosenMovie = (state) => state[NameSpace.MOVIES].chosenMovie;

export const getSimilarFilms = (state, chosenMovie) => {
  const films = state[NameSpace.DATA].films;

  const similarFilms = films
    .filter((filmItem) => filmItem.genre === chosenMovie.genre && filmItem.title !== chosenMovie.title)
    .slice(0, SIMILAR_FILMS_AMOUNT);

  return similarFilms;
};
