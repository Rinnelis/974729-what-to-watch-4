import {ActionType, reducer} from "./movies.js";
import {film} from "../../test-data.js";
import {ALL_GENRES} from "../../const.js";

it(`Should render initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: ALL_GENRES,
    filmsByGenre: [],
    similarFilms: [],
    chosenMovie: false
  });
});

it(`Should render correct chosen genre`, () => {
  expect(reducer({
    currentGenre: ALL_GENRES,
  }, {
    type: ActionType.CHOOSE_GENRE,
    payload: (`Horror`),
  })).toEqual({
    currentGenre: `Horror`,
  });
});

it(`Should change chosenMovie`, () => {
  expect(reducer({
    chosenMovie: false,
  }, {
    type: ActionType.CHOOSE_MOVIE,
    payload: film,
  })).toEqual({
    chosenMovie: film,
  });
});
