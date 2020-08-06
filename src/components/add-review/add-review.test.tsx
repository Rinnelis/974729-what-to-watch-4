import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AddReview from "./add-review";
import {AuthStatus} from "../../const";
import {film, user} from "../../test-data";
import {NameSpace} from "../../reducer/name-space";
import history from "../../history";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Should render AddReview`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.AUTH,
      authError: false,
      user,
      isAuthInProgress: false,
    },
    [NameSpace.DATA]: {
      isSendingReview: false,
      sendReviewError: false,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <AddReview
            chosenMovie={film}
            comment={``}
            rating={`3`}
            onReviewWrite={noop}
            onRatingChange={noop}
            onReviewSubmit={noop}
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
