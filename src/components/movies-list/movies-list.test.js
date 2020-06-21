import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {movieTestInfo} from "../../mocks/movie-test-info.js";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      films={movieTestInfo}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
