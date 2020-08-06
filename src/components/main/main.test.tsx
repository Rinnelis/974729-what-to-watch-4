import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES, AuthStatus} from "../../const";
import {NameSpace} from "../../reducer/name-space";
import {film, films} from "../../test-data";
import history from "../../history";
import {noop} from "../../utils";

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
      isAuthInProgress: false,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Main
            onGenreClick={noop}
            maxShownFilms={8}
            onShownFilmsAmountReset={noop}
            onShownFilmsAdd={noop}
            isAuth={true}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
