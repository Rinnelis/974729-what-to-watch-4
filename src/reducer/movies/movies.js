import {extend} from "../../utils.js";
import {ALL_GENRES} from "../../const.js";

const initialState = {
  currentGenre: ALL_GENRES,
  filmsByGenre: [],
  similarFilms: [],
  chosenMovie: false,
};

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
  CHOOSE_MOVIE: `CHOOSE_MOVIE`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),

  chooseMovie: (film) => ({
    type: ActionType.CHOOSE_MOVIE,
    payload: film,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.CHOOSE_MOVIE:
      return extend(state, {
        chosenMovie: action.payload,
      });

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
