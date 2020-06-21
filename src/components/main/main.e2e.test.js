import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {movieTestInfo} from "../../mocks/movie-test-info.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title link be pressed`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        filmTitle={`Fantastic Beasts`}
        filmGenre={`Comedy`}
        releaseDate={2020}
        films={movieTestInfo}
        onTitleClick={onTitleClick}
      />
  );

  const titles = main.find(`.small-movie-card__link`);

  titles.forEach((title) => title.simulate(`click`));

  expect(onTitleClick).toHaveBeenCalledTimes(titles.length);
});
