import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES} from "../../const.js";
import {getGenresList} from "../../utils.js";
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title or image be pressed`, () => {
  const store = mockStore({
    film,
    films,
    genresList: getGenresList(films),
    currentGenre: ALL_GENRES,
    filmsByGenre: films,
  });
  const onCardClick = jest.fn();

  const main = shallow(
      <Provider store={store}>
        <Main
          onCardClick={() => {}}
        />
      </Provider>
  );

  const titles = main.find(`.small-movie-card__link`);
  const images = main.find(`.small-movie-card__image`);

  titles.forEach((title) => title.simulate(`click`));
  images.forEach((image) => image.simulate(`click`));

  expect(onCardClick).toHaveBeenCalledTimes(titles.length + images.length);
});
