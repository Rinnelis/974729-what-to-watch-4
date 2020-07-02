import React from "react";
import renderer from "react-test-renderer";
import Overview from "./overview.jsx";
import film from "../../mocks/film.js";

it(`Should Overview render correctly`, () => {
  const tree = renderer
    .create(<Overview
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
