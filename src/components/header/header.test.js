import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus} from "../../const.js";
import Header from "./header.jsx";
import {user} from "../../test-data.js";
import history from "../../history.js";

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
