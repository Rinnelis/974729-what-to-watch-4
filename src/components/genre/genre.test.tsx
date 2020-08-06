import * as React from "react";
import * as renderer from "react-test-renderer";
import Genre from "./genre";
import {ALL_GENRES} from "../../const";
import {films} from "../../test-data";
import {noop} from "../../utils";

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
        films={films}
        genres={genres}
        currentGenre={ALL_GENRES}
        onGenreClick={noop}
        onGenreChange={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
