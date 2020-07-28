import React from "react";
import renderer from "react-test-renderer";
import withChosenMovie from "./with-chosen-movie.jsx";
import {film} from "../../test-data.js";

const MockComponent = () => <div />;
const MockComponentWrapped = withChosenMovie(MockComponent);

it(`withChosenMovie is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      chosenMovie={film}
      onMovieChoose={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
