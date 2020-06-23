import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import movieTestInfo from "../../mocks/movie-test-info.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title or image be pressed`, () => {
  const onCardClick = jest.fn();

  const main = shallow(
      <Main
        title={`Fantastic Beasts`}
        genre={`Comedy`}
        releaseDate={2020}
        films={movieTestInfo}
        onCardClick={onCardClick}
      />
  );

  const titles = main.find(`.small-movie-card__link`);
  const images = main.find(`.small-movie-card__image`);

  titles.forEach((title) => title.simulate(`click`));
  images.forEach((image) => image.simulate(`click`));

  expect(onCardClick).toHaveBeenCalledTimes(titles.length + images.length);
});
