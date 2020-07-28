import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {film} from "../../test-data.js";
import withChosenMovie from "./with-chosen-movie.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withChosenMovie(MockComponent);


it(`Should withChosenMovie choose movie`, () => {
  const onMovieChoose = jest.fn();
  const chosenMovie = film;

  const wrapper = mount(
      <MockComponentWrapped
        chosenMovie={chosenMovie}
        onMovieChoose={onMovieChoose}
      />
  );

  wrapper.instance()._handleMovieChoose(chosenMovie);
  expect(wrapper.state().chosenMovie).toEqual(chosenMovie);
});
