import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space";
import {AuthStatus} from "../../const";
import Header from "./header";
import {user} from "../../test-data";
import history from "../../history";

const mockStore = configureStore([]);

it(`SHould render header with Sign In`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      },
      isAuthInProgress: false,
      authError: false,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SHould render header without Sign In`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.AUTH,
      user,
      isAuthInProgress: false,
      authError: false,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
