import * as React from "react";
import * as renderer from "react-test-renderer";
import Overview from "./overview";
import {film} from "../../test-data";

it(`Should Overview render correctly`, () => {
  const tree = renderer
    .create(<Overview
      film={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
