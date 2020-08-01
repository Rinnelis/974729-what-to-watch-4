import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list.jsx";
import {user, films, film} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus} from "../../const.js";
import history from "../../history.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    authError: false,
    user,
    isAuthInProgress: false,
  },
  [NameSpace.DATA]: {
    film,
    films,
    favoriteFilms: films,
    isLoadingFavoriteFilms: false,
    loadFavoriteFilmsError: false,
  }
});

it(`Should render MyList`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MyList
            user={user}
            favoriteFilms={films}
            loadFavoriteFilms={() => {}}
            isLoadingFavoriteFilms={{
              isLoadingFavoriteFilms: false,
              loadFavoriteFilmsError: false,
            }}
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

