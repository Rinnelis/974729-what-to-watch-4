import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {films} from "../../test-data.js";
import {ALL_GENRES} from "../../const.js";
import Genre from "./genre.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const genres = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];


it(`Should clicked on genre`, () => {
  const onGenreClick = jest.fn();

  const genrePage = mount(
      <Genre
        films={films}
        genres={genres}
        currentGenre={ALL_GENRES}
        onGenreClick={onGenreClick}
        onGenreChange={() => {}}
      />
  );

  const genreBtn = genrePage.find(`.catalog__genres-item`);
  genreBtn.forEach((genre) => genre.simulate(`click`));
  expect(onGenreClick.mock.calls.length).toBe(genres.length);
});
