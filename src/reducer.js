import {extend, getGenresList} from "./utils.js";
import {ALL_GENRES} from "./const.js";
import films from "./mocks/films.js";
import film from "./mocks/film.js";

const initialState = {
  film,
  films,
  genresList: getGenresList(films),
  currentGenre: ALL_GENRES,
  filmsByGenre: films,
};

const ActionType = {
  CHOOSE_GENRE: `CHOOSE_GENRE`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
};

const ActionCreator = {
  chooseGenre: (genre) => ({
    type: ActionType.CHOOSE_GENRE,
    payload: genre,
  }),

  getFilmsByGenre: (selectedGenre = ALL_GENRES) => {
    let filmsByGenre = films;

    if (selectedGenre !== ALL_GENRES) {
      filmsByGenre = films
        .filter((movie) => movie.genre === selectedGenre);
    }

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        filmsByGenre: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
