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
  const onCardClick = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={movieTestInfo}
        onMouseEnter={onMouseEnter}
        onCardClick={onCardClick}
      />
  );

  const card = movieCard.find(`.small-movie-card`);
  const title = movieCard.find(`.small-movie-card__link`);

  card.simulate(`mouseenter`, movieTestInfo);
  title.simulate(`click`);

  expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movieTestInfo);
  expect(onCardClick).toHaveBeenCalledTimes(1);
});
