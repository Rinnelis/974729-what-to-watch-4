import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-btn.jsx";

it(`Should ShowMoreButton render correctly`, () => {
  const tree = renderer
    .create(<ShowMoreButton
      onShowMoreClick={() => {}}
    />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
