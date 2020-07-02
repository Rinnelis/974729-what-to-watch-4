import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      film={film}
      films={films}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
