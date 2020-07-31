import React from "react";
import {Router} from "react-router-dom";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import withVideo from "../../hocs/with-video/with-video.jsx";
import {film} from "../../test-data.js";
import history from "../../history.js";

const MovieCardWrapped = withVideo(MovieCard);

Enzyme.configure({
  adapter: new Adapter(),
});

const onMouseClick = jest.fn();

const card = shallow(
    <Router history={history}>
      <MovieCardWrapped
        film={film}
        onCardClick={onMouseClick}
        isVideoPlaying={false}
        setVideoPlaying={() => {}}
      />
    </Router>
);

it(`Should image be clicked`, () => {
  const image = card.find(`.small-movie-card__image`);
  image.simulate(`click`);
  expect(onMouseClick).toHaveBeenCalledWith(film);
});

it(`Should title be clicked`, () => {
  const title = card.find(`.small-movie-card__title`);
  title.simulate(`click`);
  expect(onMouseClick).toHaveBeenCalledWith(film);
});
