import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {film} from "../../test-data.js";
import withReview from "./with-review.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withReview(MockComponent);

const mockEvent = {
  preventDefault() {},
};

const mockReview = {
  target: {
    value: `review`,
  }
};

const mockRating = {
  target: {
    value: `3`,
  }
};

const onReviewSubmit = jest.fn();
const chosenMovie = film;

const wrapper = mount(
    <MockComponentWrapped
      film={chosenMovie}
      onReviewSubmit={onReviewSubmit}
    />
);

it(`Should withComment change review`, () => {
  wrapper.instance()._handleReviewWrite(mockReview);
  expect(wrapper.state().review).toEqual(mockReview.target.value);
});

it(`Should withComment change rating`, () => {
  wrapper.instance()._handleRatingChange(mockRating);
  expect(wrapper.state().rating).toEqual(mockRating.target.value);
});

it(`Should withComment submit`, () => {
  wrapper.setState({
    rating: mockRating.target.value,
    review: mockReview.target.value,
  });

  wrapper.instance()._handleReviewSubmit(mockEvent);
  expect(onReviewSubmit).toHaveBeenCalledWith(chosenMovie.id, {
    rating: mockRating.target.value,
    review: mockReview.target.value,
  });
});
