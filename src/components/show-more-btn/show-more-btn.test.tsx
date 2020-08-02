import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-btn";
import {noop} from "../../utils";

it(`Should ShowMoreButton render correctly`, () => {
  const tree = renderer
    .create(<ShowMoreButton
      onShowMoreClick={noop}
    />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
