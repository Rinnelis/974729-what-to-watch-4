import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {film} from "../../test-data";

it(`VideoPlayer is rendered correctly`, () => {
  const tree = renderer.create(<VideoPlayer
    film={film}
    isPlaying={true}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
