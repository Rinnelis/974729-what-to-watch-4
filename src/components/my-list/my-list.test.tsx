import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MyList} from "./my-list";
import {user, films, film} from "../../test-data";
import {NameSpace} from "../../reducer/name-space";
import {AuthStatus} from "../../const";
import history from "../../history";
import {noop} from "../../utils";

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
            loadFavoriteFilms={noop}
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

