import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {film} from "../../test-data.js";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      film={film}
      onCardClick={() => {}}
      isVideoPlaying={false}
      setVideoPlaying={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
