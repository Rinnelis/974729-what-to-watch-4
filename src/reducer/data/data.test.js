import MockAdapter from "axios-mock-adapter";
import {filmAdapter} from "../../film-adapter.js";
import {film, films, comments} from "../../test-data.js";
import {createAPI} from "../../api.js";
import {ActionType, Operation, reducer} from "./data.js";

const api = createAPI(() => {});

it(`Should update films by loading`, () => {
  expect(reducer({
    films: [],
  }, {
    type: ActionType.LOAD_FILMS,
    payload: films
  })).toEqual({
    films,
  });
});

it(`Should update film by loading`, () => {
  expect(reducer({
    film: false,
  }, {
    type: ActionType.LOAD_PROMO,
    payload: film
  })).toEqual({
    film,
  });
});

it(`Should update comments by loading`, () => {
  expect(reducer({
    comments: false,
  }, {
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  })).toEqual({
    comments,
  });
});

it(`Should correctly go to /films`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const filmsLoader = Operation.loadFilms();
  apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);
  return filmsLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.LOAD_FILMS,
        payload: [filmAdapter({fake: true})],
      });
    });
});

it(`Should correctly go to /films/promo`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const promoLoader = Operation.loadPromo();
  apiMock
    .onGet(`/films/promo`)
    .reply(200, [{fake: true}]);
  return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_PROMO,
          payload: filmAdapter({fake: true}),
        });
      });
});

it(`Should correctly go to /comments/filmID`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const promoLoader = Operation.loadComments(1);

  apiMock
    .onGet(`/comments/1`)
    .reply(200, [{fake: true}]);

  return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
});
