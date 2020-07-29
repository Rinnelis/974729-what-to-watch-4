import React from "react";
import renderer from "react-test-renderer";
import withReview from "./with-review.jsx";
import {film} from "../../test-data.js";

const MockComponent = () => <div />;
const MockComponentWrapped = withReview(MockComponent);

it(`withReview is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}
      onReviewSubmit={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
