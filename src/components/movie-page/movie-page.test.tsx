import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space";
import MoviePage from "./movie-page";
import {film, films} from "../../test-data";
import {AuthStatus} from "../../const";
import history from "../../history";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Should MoviePage render correctly`, () => {
  const store = mockStore({
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
    [NameSpace.DATA]: {
      films,
      isSendingFavoriteFilm: false,
      sendFavoriteFilmSuccess: false,
      sendFavoriteFilmError: false,
    },
    [NameSpace.MOVIES]: {
      chosenMovie: films[3],
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MoviePage
            chosenMovie={film}
            similarFilms={films}
            currentTab={`Overview`}
            onTabClick={noop}
            onCurrentTabRender={noop}
            authStatus={AuthStatus.NO_AUTH}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
