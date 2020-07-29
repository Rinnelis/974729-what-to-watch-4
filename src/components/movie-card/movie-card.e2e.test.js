import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import withVideo from "../../hocs/with-video/with-video.jsx";
import {film} from "../../test-data.js";

const MovieCardWrapped = withVideo(MovieCard);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should get MovieCard info`, () => {
  const onCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onCardClick={onCardClick}
        isVideoPlaying={false}
        setVideoPlaying={() => {}}
      />
  );

  const title = movieCard.find(`.small-movie-card__link`);
  title.simulate(`click`);
  expect(onCardClick).toHaveBeenCalledTimes(1);
});

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.load = () => {};

describe(`MovieCard with HOC video`, () => {
  const setVideoPlaying = jest.fn();

  const initialState = {
    isVideoPlaying: false,
  };

  const page = mount(
      <MovieCardWrapped
        film={film}
        onCardClick={() => {}}
        isVideoPlaying={false}
        setVideoPlaying={() => {}}
      />
  );

  page.setState(initialState);

  it(`Should render initialState`, () => {
    expect(page.state()).toEqual(initialState);
  });

  it(`Should change isVideoPlaying state onMouseEnter`, () => {
    const movieCard = page.find(`.small-movie-card`);
    movieCard.props().onMouseEnter(setVideoPlaying(true), page.setState({
      isPlaying: true,
    }));
    expect(page.state().isVideoPlaying).toEqual(true);
  });

  it(`Should change isVideoPlaying state onMouseLeave`, () => {
    const movieCard = page.find(`.small-movie-card`);
    movieCard.props().onMouseLeave(setVideoPlaying(false), page.setState({
      isPlaying: false,
    }));
    expect(page.state().isVideoPlaying).toEqual(false);
  });
});
