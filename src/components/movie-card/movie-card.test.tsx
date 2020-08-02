import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import {film} from "../../test-data";
import history from "../../history";
import {noop} from "../../utils";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieCard
            film={film}
            isVideoPlaying={false}
            setVideoPlaying={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
