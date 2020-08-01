import React from "react";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Reviews} from "./reviews.jsx";
import {comments, film} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`Should render Reviews with comments`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: false,
      loadCommentsError: false,
    },
    [NameSpace.MOVIES]: {
      chosenMovie: film,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Reviews
            comments={comments}
            loadComments={() => {}}
            isLoadingComments={{
              isLoadingComments: false,
              loadCommentsError: false,
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

it(`Should render Reviews with comments loading message`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: true,
      loadCommentsError: false,
    },
    [NameSpace.MOVIES]: {
      chosenMovie: film,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Reviews
            comments={comments}
            loadComments={() => {}}
            isLoadingComments={{
              isLoadingComments: false,
              loadCommentsError: false,
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

it(`Shouldn't render Reviews comments`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
      isLoadingComments: true,
      loadCommentsError: true,
    },
    [NameSpace.MOVIES]: {
      chosenMovie: film,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <Reviews
            comments={comments}
            loadComments={() => {}}
            isLoadingComments={{
              isLoadingComments: false,
              loadCommentsError: false,
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
