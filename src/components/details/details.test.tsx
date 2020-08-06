import * as React from "react";
import * as renderer from "react-test-renderer";
import Details from "./details";
import {film} from "../../test-data";

it(`Should Details render correctly`, () => {
  const tree = renderer
    .create(<Details
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
