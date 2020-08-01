import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {films} from "../../test-data.js";
import history from "../../history.js";

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
