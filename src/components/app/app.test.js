import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmTitle={`Fantastic Beasts`}
      filmGenre={`Comedy`}
      releaseDate={2020}
      titles={[`The Grand Budapest Hotel`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
