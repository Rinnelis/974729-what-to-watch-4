import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data.js";
import {AuthStatus} from "../../const.js";
import history from "../../history.js";

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
            onMovieChoose={() => {}}
            currentTab={`Overview`}
            onTabClick={() => {}}
            onCurrentTabRender={() => {}}
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
