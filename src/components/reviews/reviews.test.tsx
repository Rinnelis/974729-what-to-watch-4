import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Reviews} from "./reviews";
import {comments, film} from "../../test-data";
import {NameSpace} from "../../reducer/name-space";
import history from "../../history";

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
            chosenMovie={film}
            comments={comments}
            loadComments={() => []}
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
            chosenMovie={film}
            comments={comments}
            loadComments={() => []}
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
            chosenMovie={film}
            comments={comments}
            loadComments={() => []}
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
