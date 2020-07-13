import React from "react";
import renderer from "react-test-renderer";
import Genre from "./genre.jsx";
import {ALL_GENRES} from "../../const.js";

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

it(`Should Genre render correctly`, () => {
  const tree = renderer.create(
      <Genre
        genres={genres}
        currentGenre={ALL_GENRES}
        onGenreClick={() => {}}
        onGenreChange={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
