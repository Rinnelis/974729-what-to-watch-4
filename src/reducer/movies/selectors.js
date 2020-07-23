import {ALL_GENRES} from "../../const.js";
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
