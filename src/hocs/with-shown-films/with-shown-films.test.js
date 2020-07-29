import React from "react";
import renderer from "react-test-renderer";
import withShownFilms from "./with-shown-films.jsx";

const MockComponent = () => <div />;
const MockComponentWrapped = withShownFilms(MockComponent);

it(`withShownFilms is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      maxShownFilms={8}
      onShownFilmsAmountReset={() => {}}
      onShownFilmsAdd={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
