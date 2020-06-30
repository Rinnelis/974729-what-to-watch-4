import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import movieTestInfo from "../../mocks/movie-test-info.js";
import film from "../../mocks/film.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      title={`Fantastic Beasts`}
      genre={`Comedy`}
      releaseDate={2020}
      films={movieTestInfo}
      film={film}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
