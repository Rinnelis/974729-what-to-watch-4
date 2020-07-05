import {ALL_GENRES} from "./const.js";

export const extend = (prevState, newState) => {
  return Object.assign({}, prevState, newState);
};

export const getGenresList = (movies) => {
  const movieGenres = new Set(movies.map((movie) => movie.genre));
  return [ALL_GENRES, ...movieGenres];
};
