import {extend} from "../utils.js";
import {ALL_GENRES} from "../../const.js";
import {filmAdapter} from "../../film-adapter.js";

const initialState = {
  film: false,
  films: [],
  genresList: [ALL_GENRES],
  comments: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
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
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film)))));
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => dispatch(ActionCreator.loadPromo(filmAdapter(response.data))));
  },

  loadComments: (movieID) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieID}`)
      .then((response) => dispatch(ActionCreator.loadComments(response.data)));
  }
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

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
