import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const movieTestInfo = {
  title: `Moonrise Kingdom`,
  image: `img/moonrise-kingdom.jpg`,
  videoUrl: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should get MovieCard info`, () => {
  const onCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={movieTestInfo}
        onCardClick={onCardClick}
        isVideoPlaying={false}
        setVideoPlaying={() => {}}
      />
  );

  const title = movieCard.find(`.small-movie-card__link`);
  title.simulate(`click`);
  expect(onCardClick).toHaveBeenCalledTimes(1);
});
