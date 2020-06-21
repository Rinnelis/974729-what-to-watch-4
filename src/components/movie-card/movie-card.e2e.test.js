import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

const movieTestInfo = {
  title: `Moonrise Kingdom`,
  image: `img/moonrise-kingdom.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should get MovieCard info`, () => {
  const onMouseEnter = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={movieTestInfo}
        onTitleClick={() => {}}
        onMouseEnter={onMouseEnter}
      />
  );

  const movieCards = movieCard.find(`.small-movie-card`);

  movieCards.simulate(`mouseenter`, movieTestInfo);

  expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movieTestInfo);
});
