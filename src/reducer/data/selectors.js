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

export const getFilmsStatus = (state) => ({
  isLoadingFilms: state[NameSpace.DATA].isLoadingFilms,
  loadFilmsError: state[NameSpace.DATA].loadFilmsError,
});

export const getPromoStatus = (state) => ({
  isLoadingPromo: state[NameSpace.DATA].isLoadingPromo,
  loadPromoError: state[NameSpace.DATA].loadPromoError,
});

export const getCommentsStatus = (state) => ({
  isLoadingComments: state[NameSpace.DATA].isLoadingComments,
  loadCommentsError: state[NameSpace.DATA].loadCommentsError,
});

export const getReviewStatus = (state) => ({
  isSendingReview: state[NameSpace.DATA].isSendingReview,
  sendReviewError: state[NameSpace.DATA].sendReviewError,
});
