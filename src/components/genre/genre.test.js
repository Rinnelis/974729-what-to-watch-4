import React from 'react';
import renderer from 'react-test-renderer';
import Genre from './genre.jsx';
import {MovieGenre} from '../../const.js';

it(`Should Genre render correctly`, () => {
  const tree = renderer.create(
      <Genre
        genres={MovieGenre}
        currentGenre={MovieGenre.ALL}
        onGenreClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
