import {ALL_GENRES} from "../../const.js";
import {NameSpace} from "../name-space.js";

export const getGenresList = (state) => {
  const films = state[NameSpace.DATA].films;
  const genresList = new Set(films.map((film) => film.genre));
  return [ALL_GENRES, ...genresList];
};

export const getFilms = (state) => state[NameSpace.DATA].films;

export const getPromo = (state) => state[NameSpace.DATA].film;

export const getFilmComments = (state) => state[NameSpace.DATA].comments;
