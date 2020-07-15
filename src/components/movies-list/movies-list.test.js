import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import films from "../../mocks/films.js";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      films={films}
      onCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
