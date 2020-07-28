import MockAdapter from "axios-mock-adapter";
import {filmAdapter} from "../../adapters/film-adapter.js";
import {film, films, comments} from "../../test-data.js";
import {createAPI} from "../../api.js";
import {ActionType, Operation, reducer} from "./data.js";

const api = createAPI(() => {});

it(`Should render initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    film: false,
    films: [],
    genresList: [`All genres`],
    comments: false,
    isLoadingFilms: true,
    isLoadingPromo: true,
    isLoadingComments: true,
    loadFilmsError: false,
    loadPromoError: false,
    loadCommentsError: false,
    isSendingReview: false,
    sendReviewError: false,
  });
});

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

it(`Should update promo by loading`, () => {
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

it(`Should update films' loading status`, () => {
  expect(reducer({
    isLoadingFilms: true,
  }, {
    type: ActionType.IS_LOADING_FILMS,
    payload: false
  })).toEqual({
    isLoadingFilms: false,
  });
});

it(`Should update films' loading error`, () => {
  expect(reducer({
    loadFilmsError: false,
  }, {
    type: ActionType.LOAD_FILMS_ERROR,
    payload: true
  })).toEqual({
    loadFilmsError: true,
  });
});

it(`Should update promo loading status`, () => {
  expect(reducer({
    isLoadingPromo: true,
  }, {
    type: ActionType.IS_LOADING_PROMO,
    payload: false
  })).toEqual({
    isLoadingPromo: false,
  });
});

it(`Should update promo loading error`, () => {
  expect(reducer({
    loadPromoError: false,
  }, {
    type: ActionType.LOAD_PROMO_ERROR,
    payload: true
  })).toEqual({
    loadPromoError: true,
  });
});

it(`Should update comments loading status`, () => {
  expect(reducer({
    isLoadingComments: true,
  }, {
    type: ActionType.IS_LOADING_COMMENTS,
    payload: false
  })).toEqual({
    isLoadingComments: false,
  });
});

it(`Should update comments loading error`, () => {
  expect(reducer({
    loadCommentsError: false,
  }, {
    type: ActionType.LOAD_COMMENTS_ERROR,
    payload: true
  })).toEqual({
    loadCommentsError: true,
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

it(`Should correctly post review to comments/filmID`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const reviewSending = Operation.sendReview(0, {
    rating: `3`,
    review: `review`,
  });

  apiMock
    .onPost(`/comments/0`)
    .reply(200, [{fake: true}]);

  return reviewSending(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.IS_SENDING_REVIEW,
        payload: true,
      });
    });
});

it(`Should update review sending status`, () => {
  expect(reducer({
    isSendingReview: false,
  }, {
    type: ActionType.IS_SENDING_REVIEW,
    payload: true
  })).toEqual({
    isSendingReview: true,
  });
});

it(`Should update review sending error`, () => {
  expect(reducer({
    sendReviewError: false,
  }, {
    type: ActionType.SEND_REVIEW_ERROR,
    payload: true
  })).toEqual({
    sendReviewError: true,
  });
});
