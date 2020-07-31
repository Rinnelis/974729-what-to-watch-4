import React from "react";
import renderer from "react-test-renderer";
import {film} from "../../test-data.js";
import VideoPlayerFull from "./video-player-full.jsx";

it(`Should VideoPlayerFull play`, () => {
  const tree = renderer
    .create(
        <VideoPlayerFull
          chosenMovie={film}
          currentTime={20}
          leftTime={`00:10:12`}
          duration={100}
          isPlaying={true}
          onPlayBtnClick={() => {}}
          onFullScreenClick={() => {}}
        ><video/>
        </VideoPlayerFull>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should VideoPlayerFull pause`, () => {
  const tree = renderer
    .create(
        <VideoPlayerFull
          chosenMovie={film}
          currentTime={20}
          leftTime={`00:10:12`}
          duration={100}
          isPlaying={false}
          onPlayBtnClick={() => {}}
          onFullScreenClick={() => {}}
        ><video/>
        </VideoPlayerFull>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
