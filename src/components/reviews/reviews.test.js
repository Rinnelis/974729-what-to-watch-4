import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import {comments} from "../../test-data.js";

it(`Should Reviews render correctly`, () => {
  const tree = renderer
    .create(<Reviews
      reviews={comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
