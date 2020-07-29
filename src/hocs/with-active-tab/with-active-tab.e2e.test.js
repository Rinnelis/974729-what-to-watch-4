import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MovieNav} from "../../const.js";
import {film} from "../../test-data.js";
import withActiveTab from "./with-active-tab.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

const wrapper = mount(
    <MockComponentWrapped
      film={film}
      onTabClick={jest.fn()}
      onCurrentTabRender={jest.fn()}
    />
);

wrapper.setState({
  activeTab: MovieNav.OVERVIEW,
});

it(`Should withActiveTab render Overview`, () => {
  wrapper.instance()._handleTabClick(MovieNav.OVERVIEW);
  wrapper.instance()._handleCurrentTabRender();
  expect(wrapper.state().currentTab).toEqual(MovieNav.OVERVIEW);
});

it(`Should withActiveTab render Details`, () => {
  wrapper.instance()._handleTabClick(MovieNav.DETAILS);
  wrapper.instance()._handleCurrentTabRender();
  expect(wrapper.state().currentTab).toEqual(MovieNav.DETAILS);
});

it(`Should withActiveTab render Reviews`, () => {
  wrapper.instance()._handleTabClick(MovieNav.REVIEWS);
  wrapper.instance()._handleCurrentTabRender();
  expect(wrapper.state().currentTab).toEqual(MovieNav.REVIEWS);
});
