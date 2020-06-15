import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      filmTitle={`Fantastic Beasts`}
      filmGenre={`Comedy`}
      releaseDate={2020}
      titles={[`The Grand Budapest Hotel`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
