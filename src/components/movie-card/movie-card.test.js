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
      onTitleClick={() => {}}
      onMouseEnter={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
