import {ActionType, reducer} from "./movies.js";

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
