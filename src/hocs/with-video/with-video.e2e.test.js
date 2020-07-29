import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

const wrapper = mount(
    <MockComponentWrapped />
);

it(`Should withVideo play video`, () => {
  wrapper.instance()._setVideoPlaying(true);
  expect(wrapper.state().isVideoPlaying).toEqual(true);
});

it(`Shouldn't withVideo play video`, () => {
  wrapper.setState({
    isVideoPlaying: true,
  });

  wrapper.instance()._setVideoPlaying(false);
  expect(wrapper.state().isVideoPlaying).toEqual(false);
});
