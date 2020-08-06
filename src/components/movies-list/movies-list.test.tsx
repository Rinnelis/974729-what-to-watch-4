import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import MoviesList from "./movies-list";
import {films} from "../../test-data";
import history from "../../history";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MoviesList
            films={films}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
