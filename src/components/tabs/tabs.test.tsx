import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {MovieNav} from "../../const";
import {noop} from "../../utils";

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      tabs={MovieNav}
      currentTab={MovieNav.OVERVIEW}
      onTabClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
