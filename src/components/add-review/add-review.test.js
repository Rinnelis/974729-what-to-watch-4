import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AddReview from "./add-review.jsx";
import {AuthStatus, Page} from "../../const.js";
import {film, user} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`Should render AddReview`, () => {
  const store = mockStore({
    [NameSpace.PAGE]: {
      currentPage: Page.REVIEW,
    },
    [NameSpace.USER]: {
      authStatus: AuthStatus.AUTH,
      authError: false,
      user,
    },
    [NameSpace.DATA]: {
      isSendingReview: false,
      sendReviewError: false,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <AddReview
          film={film}
          review={``}
          rating={`3`}
          onReviewWrite={() => {}}
          onRatingChange={() => {}}
          onReviewSubmit={() => {}}
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
