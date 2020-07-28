import {extend} from "../utils.js";
import {ALL_GENRES} from "../../const.js";
import {filmAdapter} from "../../adapters/film-adapter.js";

const EntryPoint = {
  FILMS: `/films`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments/`,
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
  loadCommentsError: false
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
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(EntryPoint.FILMS)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFilms(false));
        dispatch(ActionCreator.loadFilmsError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadFilmsError(true));
        throw err;
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(EntryPoint.PROMO)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(filmAdapter(response.data)));
        dispatch(ActionCreator.isLoadingPromo(false));
        dispatch(ActionCreator.loadPromoError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadPromoError(true));
        throw err;
      });
  },

  loadComments: (movieID) => (dispatch, getState, api) => {
    return api.get(`${EntryPoint.COMMENTS}${movieID}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
        dispatch(ActionCreator.isLoadingComments(false));
        dispatch(ActionCreator.loadCommentsError(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.loadCommentsError(true));
        throw err;
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

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
