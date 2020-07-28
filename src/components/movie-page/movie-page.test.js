import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data.js";
import {AuthStatus, Page} from "../../const.js";

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
    [NameSpace.PAGE]: {
      currentPage: Page.MOVIE_PAGE,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MoviePage
          film={film}
          similarFilms={films}
          onCardClick={() => {}}
          currentTab={`Overview`}
          onTabClick={() => {}}
          onCurrentTabRender={() => {}}
          onPlayBtnClick={() => {}}
          onSignInClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
