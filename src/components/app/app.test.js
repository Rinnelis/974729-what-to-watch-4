import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {ALL_GENRES, AuthStatus} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      film,
      films,
      isLoadingFilms: false,
      isLoadingPromo: false,
      loadFilmsError: false,
      loadPromoError: false,
      isSendingReview: false,
      sendReviewError: false,
      isSendingFavoriteFilm: false,
      sendFavoriteFilmSuccess: false,
      sendFavoriteFilmError: false,
    },
    [NameSpace.MOVIES]: {
      currentGenre: ALL_GENRES,
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authError: false,
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      },
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App
          onMovieChoose={() => {}}
          onCardClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
