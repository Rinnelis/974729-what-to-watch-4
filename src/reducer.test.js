import {getGenresList} from "./utils.js";
import film from "./mocks/film.js";
import films from "./mocks/films.js";
import {ActionType, reducer} from "./reducer.js";

const getFilmsByGenre = (selectedGenre) => {
  return films.filter((movie) => movie.genre === selectedGenre);
};

it(`Should render initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    film,
    films,
    genresList: getGenresList(films),
    currentGenre: `All genres`,
    filmsByGenre: films,
  });
});

it(`Should render correct chosen genre`, () => {
  expect(reducer({
    currentGenre: `All genres`,
  }, {
    type: ActionType.CHOOSE_GENRE,
    payload: `Crime`,
  })).toEqual({
    currentGenre: `Crime`,
  });
});

it(`Should render films by genre`, () => {
  expect(reducer({
    currentGenre: `Horror`,
    filmsByGenre: films,
  }, {
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: getFilmsByGenre(`Horror`),
  })).toEqual({
    currentGenre: `Horror`,
    filmsByGenre: getFilmsByGenre(`Horror`),
  });
});
