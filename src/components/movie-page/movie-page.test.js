import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import film from "../../mocks/film.js";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
