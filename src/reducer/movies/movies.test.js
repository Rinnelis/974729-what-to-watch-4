import {ActionType, reducer} from "./movies.js";

it(`Should render initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    filmsByGenre: [],
  });
});

it(`Should render correct chosen genre`, () => {
  expect(reducer({
    currentGenre: `All Genres`,
  }, {
    type: ActionType.CHOOSE_GENRE,
    payload: (`Horror`),
  })).toEqual({
    currentGenre: `Horror`,
  });
});
