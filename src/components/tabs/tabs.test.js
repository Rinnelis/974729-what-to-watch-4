import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {MovieNav} from "../../const.js";

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      tabs={MovieNav}
      currentTab={MovieNav.OVERVIEW}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
