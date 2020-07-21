import React from "react";
import renderer from "react-test-renderer";
import films from "../../mocks/films.js";
import VideoPlayerFull from "./video-player-full.jsx";

const film = films[0];

it(`Should VideoPlayerFull render correctly`, () => {
  const tree = renderer
    .create(<VideoPlayerFull
      film={film}
      currentTime={20}
      leftTime={`00:10:12`}
      duration={100}
      isPlaying={true}
      onExitBtnClick={() => {}}
      onPlayBtnClick={() => {}}
      onFullScreenClick={() => {}}
    ><video/>
    </VideoPlayerFull>, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
