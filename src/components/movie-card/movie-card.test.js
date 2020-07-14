import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const movieTestInfo = {
  title: `Moonrise Kingdom`,
  image: `img/moonrise-kingdom.jpg`,
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      film={movieTestInfo}
      onCardClick={() => {}}
      isVideoPlaying={false}
      setVideoPlaying={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
