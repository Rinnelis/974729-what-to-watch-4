import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movieTestInfo = {
  title: `Moonrise Kingdom`,
  image: `img/moonrise-kingdom.jpg`,
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      film={movieTestInfo}
      onMouseEnter={() => {}}
      onCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
