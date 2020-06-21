import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {movieTestInfo} from "../../mocks/movie-test-info.js";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      filmTitle={`Fantastic Beasts`}
      filmGenre={`Comedy`}
      releaseDate={2020}
      films={movieTestInfo}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
