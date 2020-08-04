import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {configure, mount} from "enzyme";
import {createAPI} from "../../api";
import withReview from "./with-review";
import {NameSpace} from "../../reducer/name-space";
import {ValidReview} from "../../const.js";
import {film, films} from "../../test-data";
import {noop} from "../../utils";

const api = createAPI();

const mockStore = configureStore([thunk.withExtraArgument(api)]);

const store = mockStore({
  [NameSpace.DATA]: {
    films,
  },
  [NameSpace.MOVIES]: {
    chosenMovie: film,
  },
});

const review = {
  rating: `3`,
  comment: `comment`,
};

interface Props {
  onReviewWrite: () => void;
  onRatingChange: () => void;
  onReviewSubmit: () => void;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {onReviewWrite, onRatingChange, onReviewSubmit} = props;

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={onReviewSubmit}
      >
      <input
        className="rating__input"
        id="star-5"
        type="radio"
        name="rating"
        value="5"
        onChange={onRatingChange}
      />
      <label className="rating__label" htmlFor="star-5">Rating 1</label>
      <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
        minLength={ValidReview.MIN}
        maxLength={ValidReview.MAX}
        required
        onChange={onReviewWrite}
      />
    </form>
  );
};

configure({adapter: new Adapter()});

it(`Should form be submited`, () => {
  const AddReviewWrapped = withReview(AddReview);
  const onReviewSubmit = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <AddReviewWrapped
        chosenMovie={film}
        movieID={2}
        comment={`review`}
        rating={`1`}
        onReviewSubmit={onReviewSubmit}
        onReviewWrite={noop}
        onRatingChange={noop}
        isSendingReview={{
          isSendingReview: true,
          sendReviewError: false,
          sendReviewSuccess: true,
        }}
      />
    </Provider>);

  const form = wrapper.find(`form.add-review__form`);
  const rating = wrapper.find(`.rating__input`);
  const comment = wrapper.find(`.add-review__textarea`);
  rating.simulate(`change`, {target: {value: review.rating}});
  comment.simulate(`change`, {target: {value: review.comment}});
  form.simulate(`submit`);
  expect(onReviewSubmit).toHaveBeenCalledTimes(1);
  expect(onReviewSubmit).toHaveBeenCalledWith(review);
});
