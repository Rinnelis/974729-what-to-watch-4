import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const film = {
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

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
