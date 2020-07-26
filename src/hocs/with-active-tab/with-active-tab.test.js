import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.js";
import {film} from "../../test-data.js";
import {MovieNav} from "../../const.js";

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}
      currentTab={MovieNav.OVERVIEW}
      onTabClick={() => {}}
      onCurrentTabRender={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
