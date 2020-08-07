import {extend} from "../../utils.js";
import {ALL_GENRES} from "../../const.js";
import {filmAdapter} from "../../adapters/film-adapter.tsx";
import history from "../../history";

const EntryPoint = {
  FILMS: `/films`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments/`,
  FAVORITE: `/favorite`,
};

const initialState = {
  film: false,
  films: [],
  genresList: [ALL_GENRES],
  comments: false,
  isLoadingFilms: true,
  isLoadingPromo: true,
  isLoadingComments: true,
  loadFilmsError: false,
  loadPromoError: false,
  loadCommentsError: false,
  isSendingReview: false,
  sendReviewError: false,
  sendReviewSuccess: false,
  favoriteFilms: [],
  isLoadingFavoriteFilms: true,
  loadFavoriteFilmsError: false,
  isSendingFavoriteFilm: false,
  sendFavoriteFilmSuccess: false,
  sendFavoriteFilmError: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FILMS_ERROR: `LOAD_FILMS_ERROR`,
  LOAD_PROMO_ERROR: `LOAD_PROMO_ERROR`,
  LOAD_COMMENTS_ERROR: `LOAD_COMMENTS_ERROR`,
  IS_LOADING_FILMS: `IS_LOADING_FILMS`,
  IS_LOADING_PROMO: `IS_LOADING_PROMO`,
  IS_LOADING_COMMENTS: `IS_LOADING_COMMENTS`,
  IS_SENDING_REVIEW: `IS_SENDING_REVIEW`,
  SEND_REVIEW_ERROR: `SEND_REVIEW_ERROR`,
  SEND_REVIEW_SUCCESS: `SEND_REVIEW_SUCCESS`,
  IS_LOADING_FAVORITE_FILMS: `IS_LOADING_FAVORITE_FILMS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  LOAD_FAVORITE_FILMS_ERROR: `LOAD_FAVORITE_FILMS_ERROR`,
  SEND_FAVORITE_FILM: `SEND_FAVORITE_FILM`,
  SEND_FAVORITE_FILM_SUCCESS: `SEND_FAVORITE_FILM_SUCCESS`,
  SEND_FAVORITE_FILM_ERROR: `SEND_FAVORITE_FILM_ERROR`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  loadFilmsError: (error) => ({
    type: ActionType.LOAD_FILMS_ERROR,
    payload: error,
  }),

  loadPromoError: (error) => ({
    type: ActionType.LOAD_PROMO_ERROR,
    payload: error,
  }),

  loadCommentsError: (error) => ({
    type: ActionType.LOAD_COMMENTS_ERROR,
    payload: error,
  }),

  isLoadingFilms: (load) => ({
    type: ActionType.IS_LOADING_FILMS,
    payload: load,
  }),

  isLoadingPromo: (load) => ({
    type: ActionType.IS_LOADING_PROMO,
    payload: load,
  }),

  isLoadingComments: (load) => ({
    type: ActionType.IS_LOADING_COMMENTS,
    payload: load,
  }),

  isSendingReview: (comment) => ({
    type: ActionType.IS_SENDING_REVIEW,
    payload: comment,
  }),

  sendReviewError: (error) => ({
    type: ActionType.SEND_REVIEW_ERROR,
    payload: error,
  }),

  sendReviewSuccess: (success) => ({
    type: ActionType.SEND_REVIEW_SUCCESS,
    payload: success,
  }),

  isLoadingFavoriteFilms: (load) => ({
    type: ActionType.IS_LOADING_FAVORITE_FILMS,
    payload: load,
  }),

  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  }),

  loadFavoriteFilmsError: (error) => ({
    type: ActionType.LOAD_FAVORITE_FILMS_ERROR,
    payload: error,
  }),

  isSendingFavoriteFilm: (review) => ({
    type: ActionType.SEND_FAVORITE_FILM,
    payload: review,
  }),

  sendFavoriteFilmSuccess: (success) => ({
    type: ActionType.SEND_FAVORITE_FILM_SUCCESS,
    payload: success,
  }),

  sendFavoriteFilmError: (error) => ({
    type: ActionType.SEND_FAVORITE_FILM_ERROR,
    payload: error,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoint.FILMS)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFilms(false));
        dispatch(ActionCreator.loadFilmsError(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadFilmsError(true));
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(EntryPoint.PROMO)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(filmAdapter(response.data)));
        dispatch(ActionCreator.isLoadingPromo(false));
        dispatch(ActionCreator.loadPromoError(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadPromoError(true));
      });
  },

  loadComments: (movieID) => (dispatch, getState, api) => {
    return api.get(`${EntryPoint.COMMENTS}${movieID}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
        dispatch(ActionCreator.isLoadingComments(false));
        dispatch(ActionCreator.loadCommentsError(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadCommentsError(true));
      });
  },

  sendReview: (movieID, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.isSendingReview(true));
    return api.post(`${EntryPoint.COMMENTS}${movieID}`, {
      rating: comment.rating,
      comment: comment.comment,
    })
    .then(() => {
      dispatch(ActionCreator.isSendingReview(false));
      dispatch(ActionCreator.sendReviewError(false));
      dispatch(ActionCreator.sendReviewSuccess(true));
      history.push(`${EntryPoint.FILMS}/${movieID}`);
    })
    .catch(() => {
      dispatch(ActionCreator.sendReviewError(true));
      dispatch(ActionCreator.sendReviewSuccess(false));
    });
  },

  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoint.FAVORITE)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFavoriteFilms(false));
        dispatch(ActionCreator.loadFavoriteFilmsError(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadFavoriteFilmsError(true));
      });
  },

  sendFavoriteFilm: (movieID, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    dispatch(ActionCreator.isSendingFavoriteFilm(true));
    return api.post(`${EntryPoint.FAVORITE}/${movieID}/${status}`, {
      [`is_favorite`]: isFavorite,
    })
      .then(() => {
        dispatch(ActionCreator.isSendingFavoriteFilm(false));
        dispatch(ActionCreator.sendFavoriteFilmError(false));
        dispatch(ActionCreator.sendFavoriteFilmSuccess(true));
      })
      .catch(() => {
        dispatch(ActionCreator.sendFavoriteFilmError(true));
        dispatch(ActionCreator.sendFavoriteFilmSuccess(false));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        film: action.payload,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case ActionType.LOAD_FILMS_ERROR:
      return extend(state, {
        loadFilmsError: action.payload,
      });

    case ActionType.LOAD_PROMO_ERROR:
      return extend(state, {
        loadPromoError: action.payload,
      });

    case ActionType.LOAD_COMMENTS_ERROR:
      return extend(state, {
        loadCommentsError: action.payload,
      });

    case ActionType.IS_LOADING_FILMS:
      return extend(state, {
        isLoadingFilms: action.payload,
      });

    case ActionType.IS_LOADING_PROMO:
      return extend(state, {
        isLoadingPromo: action.payload,
      });

    case ActionType.IS_LOADING_COMMENTS:
      return extend(state, {
        isLoadingComments: action.payload,
      });

    case ActionType.IS_SENDING_REVIEW:
      return extend(state, {
        isSendingReview: action.payload,
      });

    case ActionType.SEND_REVIEW_ERROR:
      return extend(state, {
        sendReviewError: action.payload,
      });

    case ActionType.SEND_REVIEW_SUCCESS:
      return extend(state, {
        sendReviewSuccess: action.payload,
      });

    case ActionType.IS_LOADING_FAVORITE_FILMS:
      return extend(state, {
        isLoadingFavoriteFilms: action.payload,
      });

    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });

    case ActionType.LOAD_FAVORITE_FILMS_ERROR:
      return extend(state, {
        loadFavoriteFilmsError: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM:
      return extend(state, {
        isSendingFavoriteFilm: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM_SUCCESS:
      return extend(state, {
        sendFavoriteFilmSuccess: action.payload,
      });

    case ActionType.SEND_FAVORITE_FILM_ERROR:
      return extend(state, {
        sendFavoriteFilmError: action.payload,
      });

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
