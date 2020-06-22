import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {movieTestInfo} from "../../mocks/movie-test-info.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmTitle={`Fantastic Beasts`}
      filmGenre={`Comedy`}
      releaseDate={2020}
      films={movieTestInfo}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
