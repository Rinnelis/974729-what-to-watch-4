import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES, AuthStatus} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      film,
      films,
      isLoadingFilms: false,
      isLoadingPromo: false,
      loadFilmsError: false,
      loadPromoError: false,
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
      <Router history={history}>
        <Provider store={store}>
          <Main
            onMovieChoose={() => {}}
            onGenreClick={() => {}}
            maxShownFilms={8}
            onShownFilmsAmountReset={() => {}}
            onShownFilmsAdd={() => {}}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
