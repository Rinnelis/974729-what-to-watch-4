import React from "react";
import renderer from "react-test-renderer";
import withVideo from "./with-video.jsx";

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`withVideo is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isVideoPlaying={false}
      setVideoPlaying={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
