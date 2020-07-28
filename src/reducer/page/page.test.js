import {ActionType, reducer} from "./page.js";
import {Page} from "../../const.js";

it(`Should render initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentPage: Page.MAIN,
  });
});

it(`Should render MoviePage`, () => {
  expect(reducer({
    currentPage: Page.MAIN,
  }, {
    type: ActionType.SET_CURRENT_PAGE,
    payload: (Page.MOVIE_PAGE),
  })).toEqual({
    currentPage: Page.MOVIE_PAGE,
  });
});

it(`Should render SignIn`, () => {
  expect(reducer({
    currentPage: Page.MAIN,
  }, {
    type: ActionType.SET_CURRENT_PAGE,
    payload: Page.SIGN_IN,
  })).toEqual({
    currentPage: Page.SIGN_IN,
  });
});
