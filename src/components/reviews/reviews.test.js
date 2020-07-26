import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import {comments} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`Should render Reviews with comments`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: false,
      loadCommentsError: false,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Reviews />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render Reviews with comments loading message`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: true,
      loadCommentsError: false,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Reviews />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Shouldn't render Reviews comments`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: true,
      loadCommentsError: true,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Reviews />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
