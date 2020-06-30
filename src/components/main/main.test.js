import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import movieTestInfo from "../../mocks/movie-test-info.js";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      title={`Fantastic Beasts`}
      genre={`Comedy`}
      releaseDate={2020}
      films={movieTestInfo}
      onCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
