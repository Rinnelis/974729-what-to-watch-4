import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      film={film}
      films={films}
      onCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
