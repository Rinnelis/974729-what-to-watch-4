import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {film} from "../../test-data.js";

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
