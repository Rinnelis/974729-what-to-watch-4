import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus, Page} from "../../const.js";
import SignIn from "./sign-in.jsx";

const mockStore = configureStore([]);

it(`Should render SignIn`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authError: false,
    },
    [NameSpace.PAGE]: {
      currentPage: Page.SIGN_IN,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <SignIn />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render auth error`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authError: true,
    },
    [NameSpace.PAGE]: {
      currentPage: Page.SIGN_IN,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <SignIn />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
