import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.js";
import {films} from "../../test-data.js";

const film = films[0];

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}
      currentTab={`Overview`}
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
