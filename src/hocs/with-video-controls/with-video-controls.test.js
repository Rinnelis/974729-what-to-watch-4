import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PropTypes from "prop-types";
import withVideoControls from "./with-video-controls.js";
import {film} from "../../test-data.js";
import {NameSpace} from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.MOVIES]: {
    chosenMovie: film,
  },
});

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
    <Provider store={store}>
      <MockComponentWrapped
        currentTime={15}
        leftTime={`00:17:56`}
        duration={100}
        isPlaying={true}
        onPlayBtnClick={() => {}}
        onFullScreenClick={() => {}}
      />
    </Provider>
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
