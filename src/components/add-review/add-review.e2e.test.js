import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {configure, mount} from "enzyme";
import AddReview from "./add-review";
import {NameSpace} from "../../reducer/name-space";
import {film, films, user} from "../../test-data";
import {AuthStatus} from "../../const";
import history from "../../history";
import {noop} from "../../utils";

const mockStore = configureStore([]);

configure({adapter: new Adapter()});

const store = mockStore({
  [NameSpace.DATA]: {
    films,
  },
  [NameSpace.MOVIES]: {
    chosenMovie: film,
  },
  [NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    authError: false,
    user,
    isAuthInProgress: false,
  },
});

it(`Should form be submitted`, () => {
  const onReviewSubmit = jest.fn();

  const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <AddReview
            chosenMovie={film}
            movieID={2}
            comment={`review`}
            rating={`1`}
            onReviewSubmit={onReviewSubmit}
            onReviewWrite={noop}
            onRatingChange={noop}
            isSendingReview={{
              isSendingReview: false,
              sendReviewError: false,
              sendReviewSuccess: false,
            }}
          />
        </Provider>
      </Router>
  );

  const form = wrapper.find(`.add-review__form`);
  form.simulate(`submit`);
  expect(onReviewSubmit).toHaveBeenCalledTimes(1);
});
