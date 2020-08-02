import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {films} from "../../test-data";
import {ALL_GENRES} from "../../const";
import Genre from "./genre";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

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
        onGenreChange={noop}
      />
  );

  const genreBtn = genrePage.find(`.catalog__genres-item`);
  genreBtn.forEach((genre) => genre.simulate(`click`));
  expect(onGenreClick.mock.calls.length).toBe(genres.length);
});
