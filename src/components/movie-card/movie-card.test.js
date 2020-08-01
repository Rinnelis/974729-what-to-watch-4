import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {film} from "../../test-data.js";
import history from "../../history.js";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieCard
            film={film}
            isVideoPlaying={false}
            setVideoPlaying={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
