import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus, Page} from "../../const.js";
import Header from "./header.jsx";
import {user} from "../../test-data.js";

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
    },
    [NameSpace.PAGE]: {
      currentPage: Page.MAIN,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Header
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

it(`SHould render header without Sign In`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.AUTH,
      user,
    },
    [NameSpace.PAGE]: {
      currentPage: Page.MAIN,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Header
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
