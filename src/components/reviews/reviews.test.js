import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import film from "../../mocks/film.js";

it(`Should Reviews render correctly`, () => {
  const tree = renderer
    .create(<Reviews
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
