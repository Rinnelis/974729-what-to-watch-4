import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";
import {film} from "../../test-data.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should VideoPlayer have play state`, () => {
  const isPlaying = true;

  const videoPlayer = mount(
      <VideoPlayer
        film={film}
        isPlaying={isPlaying}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(isPlaying);
});

it(`Should VideoPlayer have stop state`, () => {
  const isPlaying = false;

  const videoPlayer = mount(
      <VideoPlayer
        film={film}
        isPlaying={isPlaying}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(isPlaying);
});
