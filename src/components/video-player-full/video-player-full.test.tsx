import * as React from "react";
import * as renderer from "react-test-renderer";
import {film} from "../../test-data";
import VideoPlayerFull from "./video-player-full";
import {noop} from "../../utils";

it(`Should VideoPlayerFull play`, () => {
  const tree = renderer
    .create(
        <VideoPlayerFull
          chosenMovie={film}
          currentTime={20}
          leftTime={`00:10:12`}
          duration={100}
          isPlaying={true}
          onPlayBtnClick={noop}
          onFullScreenClick={noop}
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
          onPlayBtnClick={noop}
          onFullScreenClick={noop}
        ><video/>
        </VideoPlayerFull>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
