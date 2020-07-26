import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

const film = {
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

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
