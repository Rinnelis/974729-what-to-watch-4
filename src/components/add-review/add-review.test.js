import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AddReview from "./add-review.jsx";
import {AuthStatus} from "../../const.js";
import {film, user} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";
import history from "../../history.js";

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
      sendReviewSuccess: false,
    },
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <AddReview
            chosenMovie={film}
            review={``}
            rating={`3`}
            onReviewWrite={() => {}}
            onRatingChange={() => {}}
            onReviewSubmit={() => {}}
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
