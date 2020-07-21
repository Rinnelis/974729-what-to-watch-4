import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withVideoControls from "./with-video-controls.js";
import films from "../../mocks/films.js";

const film = films[0];

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withVideoControls(MockComponent);

it(`withVideoControls is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={film}
      currentTime={15}
      leftTime={`00:17:56`}
      duration={100}
      isPlaying={true}
      onPlayBtnClick={() => {}}
      onFullScreenClick={() => {}}
    />
  ), {
    createNodeMock: (element) => {
      if (element.type === `video`) {
        return {
          play: () => {
            return true;
          }
        };
      }
      return null;
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
