import React from "react";
import renderer from "react-test-renderer";
import Details from "./details.jsx";
import film from "../../mocks/film.js";

it(`Should Details render correctly`, () => {
  const tree = renderer
    .create(<Details
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
